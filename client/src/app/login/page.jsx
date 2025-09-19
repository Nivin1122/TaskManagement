"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import instance from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'


const page = () => {
  const axiosInstance = instance
  const router = useRouter()
  const [data, setData] = useState({
      user_email: "",
      password: ""
  })

  const [error, setError] = useState("")

  const changeHandler = (event) => {
      const tempData = {...data}
      tempData[event.target.name] = event.target.value
      setData(tempData)
      setError("")
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (data.user_email === "" || data.password === "" ){
        setError("All fields are required")
    }
    else {
        axiosInstance.post("/user/login/", data, { withCredentials: true })
        .then(res => {
            alert("Logged in successfully")
            router.push('/')
        })
        .catch(err => {
            const error = err?.response?.data
            if (error.detail){
              setError(error.detail)
            }else{
              setError("Something went wrong. Try again")
            }
            console.log(error)
        })
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-[400px] rounded-lg overflow-hidden border-2 border-orange-900'>
        <div className='flex justify-between bg-orange-800/40 py-1 px-4 border-b-2 border-orange-900 items-center'>
          <p className='font-bold '>Login</p>
          <div className='flex gap-2'>
            <div className='w-3 h-3 bg-green-700 rounded-full'></div>
            <div className='w-3 h-3 bg-blue-700 rounded-full'></div>
            <div className='w-3 h-3 bg-red-700 rounded-full'></div>
          </div>
        </div>
        <div className='px-4 py-6'>
          <h1 className='text-center text-3xl font-bold mb-6'>Login</h1>
          <form onSubmit = {submitHandler}>
            <label htmlFor = "email" className='block mb-1 font-semibold'>Email</label>
            <input type = "email" placeholder='Email' id = "email" className='block mb-1 border-2 border-orange-900 bg-white rounded-lg px-2 py-1 w-full' onChange = {changeHandler} name = "user_email" value = {data.user_email}></input>
            <label htmlFor = "password" className='block mb-1 font-semibold'>Password</label>
            <input type = "password" placeholder='Password' id = "password" className='block mb-1 border-2 border-orange-900 bg-white rounded-lg px-2 py-1 w-full' onChange = {changeHandler} name = "password" value = {data.password}></input>
            <p className = "text-red-500">{error}</p>
            <div className='mt-10 flex justify-center gap-3'>
              <button className='py-[7px] text-center w-[120px] rounded-lg bg-orange-800/40 font-semibold'>Login</button>
              <Link href = "/signup" className='py-[7px] text-center w-[120px] rounded-lg bg-blue-500/40 font-semibold text-blue-900'>Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page