import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl font-bold mt-10'>Good Morning Deva!</h1>
            <div className='mt-10'>
                <div className='w-[400px] rounded-lg overflow-hidden border-2 border-orange-900'>
                    <div className='flex justify-between bg-orange-800/40 py-1 px-4 border-b-2 border-orange-900 items-center'>
                        <p className='font-bold '>Test</p>
                        <div className='flex gap-2'>
                            <button command="show-modal" commandfor="dialog-edit">&#127919;</button>
                        </div>
                    </div>
                    <div className='px-4 pt-6 pb-2 bg-white'>
                        <p className='h-[200px] overflow-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                        <p className='text-right text-xs font-bold'>Last modified: Sun, 08 sept 2024</p>
                        
                    </div>
                </div>
            </div>

            <div className='text-center'>
                <p className='mt-5'>No notes have been created yet.</p>
                <button command="show-modal" commandfor="dialog" className='py-[7px] text-center w-[120px] rounded-lg bg-green-500/70 font-semibold text-green-900 mt-5'>Add Note</button>
            </div>


            <AddTask />
            <EditTask />
            
        </div>
    )
}

export default page