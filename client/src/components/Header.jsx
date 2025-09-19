'use client'

import Link from 'next/link' 
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pageName = "Login"
    const pathname = usePathname();
  return (
    <>
        <header className='bg-cyan-900/50 py-3'>
            <div className='container mx-auto flex justify-between '>
                <h1 className='text-cyan-900 font-bold text-3xl'><Link href = "/">Keep Notes</Link></h1>

                <nav className='flex items-center gap-3 '>
                    <ul className='text-cyan-900'><Link href = "/login">About</Link></ul>
                    <ul className='text-cyan-900'><Link href = "">Notes</Link></ul>
                    <ul className='text-cyan-900'><Link href = "">Account</Link></ul>
                    <ul className='text-cyan-900'><Link href = "/login">Login</Link></ul>
                </nav>
            </div>
        </header>
        <div className='container mx-auto'>
            <p><Link href = "/">Homepage</Link> / <span className='font-bold'>{pathname.slice(1,pathname.length) || "Notes"}</span></p>
        </div>
    </>
  )
}

export default Header