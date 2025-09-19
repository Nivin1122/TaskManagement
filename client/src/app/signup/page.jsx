import instance from '@/utils/axiosInstance'
import Link from 'next/link'
import React from 'react'

const axiosInstance = instance

const page = () => {

  const submitHandler = () => {
    axiosInstance.post("/user/login")
    .then(res => {
        alert(res.data.message)
    })
    .catch(err => {
        alert(err.response.data.message)
    })
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
          <form>
            <label htmlFor = "username" className='block mb-1 font-semibold'>Username</label>
            <input type = "text" placeholder='Username' id = "username" className='block mb-1 border-2 bg-white border-orange-900 rounded-lg px-2 py-1 w-full'></input>
            <label htmlFor = "email" className='block mb-1 font-semibold'>Email</label>
            <input type = "email" placeholder='Email' id = "email" className='block mb-1 border-2 bg-white border-orange-900 rounded-lg px-2 py-1 w-full'></input>
            <label htmlFor = "password" className='block mb-1 font-semibold'>Password</label>
            <input type = "password" placeholder='Password' id = "password" className='block mb-1 border-2 bg-white border-orange-900 rounded-lg px-2 py-1 w-full'></input>
            <label htmlFor = "password" className='block mb-1 font-semibold'>Confirm Password</label>
            <input type = "password" placeholder='Confirm Password' id = "password" className='block mb-1 border-2 bg-white border-orange-900 rounded-lg px-2 py-1 w-full'></input>
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