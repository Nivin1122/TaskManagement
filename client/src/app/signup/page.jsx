"use client"

import instance from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'


const page = () => {
    const axiosInstance = instance
    const router = useRouter()
    const [data, setData] = useState({
        user_name: "",
        user_email: "",
        password: "",
        confirm_password: ""
    })

    const [error, setError] = useState({
        user_name: "",
        user_email: "",
        password: "",
        confirm_password: ""
    })

    const changeHandler = (event) => {
        const tempData = {...data}
        const tempError = {...error}
        tempData[event.target.name] = event.target.value
        tempError[event.target.name] = ""
        setData(tempData)
        setError(tempError)

    }

  const submitHandler = (event) => {
    event.preventDefault()
    if (data.password === ""){
        const tempData = {...error}
        tempData.password = "Password is required"
        setError(tempData)
    }
    else if(data.password === data.confirm_password){
        axiosInstance.post("/user/register/", data)
        .then(res => {
            alert(res.data.message)
            router.push('/login')
        })
        .catch(err => {
            const error = err.response.data
            const tempError = {...error}
            if (error.user_name){
                tempError["user_name"] = error.user_name
            }
            if (error.user_email){
                tempError["user_email"] = error.user_email
            }
            if (error.password){
                tempError["password"] = error.password
            }

            setError(error)
        })
    }
    else{
        const tempData = {...error}
        tempData.confirm_password = "Password doesnt match"
        setError(tempData)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-[400px] rounded-lg overflow-hidden border-2 border-orange-900'>
        <div className='flex justify-between bg-orange-800/40 py-1 px-4 border-b-2 border-orange-900 items-center'>
          <p className='font-bold '>Signup</p>
          <div className='flex gap-2'>
            <div className='w-3 h-3 bg-green-700 rounded-full'></div>
            <div className='w-3 h-3 bg-blue-700 rounded-full'></div>
            <div className='w-3 h-3 bg-red-700 rounded-full'></div>
          </div>
        </div>
        <div className='px-4 py-6'>
          <h1 className='text-center text-3xl font-bold mb-6'>Sign up</h1>
          <form onSubmit={submitHandler}>
            <label htmlFor = "username" className='block mb-1 font-semibold'>Username</label>
            <input onChange = {changeHandler} type = "text" placeholder='Username' id = "username" name = "user_name" value = {data.user_name} className='block mb-1 border-2 bg-white border-orange-900 rounded-lg px-2 py-1 w-full'></input>
            <p className = "text-red-500">{error.user_name}</p>
            <label htmlFor = "email" className='block mb-1 font-semibold'>Email</label>
            <input onChange = {changeHandler} type = "email" placeholder='Email' id = "email" name = "user_email" value = {data.user_email} className='block mb-1 border-2 bg-white border-orange-900 rounded-lg px-2 py-1 w-full'></input>
            <p className = "text-red-500">{error.user_email}</p>
            <label htmlFor = "password" className='block mb-1 font-semibold'>Password</label>
            <input onChange = {changeHandler} type = "password" placeholder='Password' id = "password" name = "password" value = {data.password} className='block mb-1 border-2 bg-white border-orange-900 rounded-lg px-2 py-1 w-full'></input>
            <p className = "text-red-500">{error.password}</p>
            <label htmlFor = "confirm_password" className='block mb-1 font-semibold'>Confirm Password</label>
            <input onChange = {changeHandler} type = "password" placeholder='Confirm Password' id = "confirm_password" name = "confirm_password" value = {data.confirm_password} className='block mb-1 border-2 bg-white border-orange-900 rounded-lg px-2 py-1 w-full'></input>
            <p className = "text-red-500">{error.confirm_password}</p>
            <div className='mt-10 flex justify-center gap-3'>
              <button className='py-[7px] text-center w-[120px] rounded-lg bg-green-500/70 font-semibold text-green-900'>Register</button>
              <Link href = "/login" className='py-[7px] text-center w-[120px] rounded-lg bg-orange-800/40 font-semibold'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page