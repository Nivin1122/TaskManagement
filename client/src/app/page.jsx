"use client"

import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'
import instance from '@/utils/axiosInstance'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const axiosInstance = instance
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editNote, setEditNote] = useState(false)
    const router = useRouter()

    const updateTasks = () => {
        axiosInstance.get("/notes/", {withCredentials: true})
        .then(res => {
            console.log(res.data)
            setNotes(res.data)
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false)
            if(err.response.status === 401){
                router.push("/login")
            }
        })
    }

    useEffect(() => {
        updateTasks()
    }, [])

    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl font-bold mt-10'>Good Morning Deva!</h1>
            <div className='mt-10 grid grid-cols-4 gap-4'>
                {notes.map((note, index) => {
                    return(
                        <div className='rounded-lg overflow-hidden border-2 border-orange-900' key = {note.note_id}>
                            <div className='flex justify-between bg-orange-800/40 py-1 px-4 border-b-2 border-orange-900 items-center'>
                                <p className='font-bold '>{note.note_title}</p>
                                <div className='flex gap-2'>
                                    <button command="show-modal" commandfor="dialog-edit" onClick={()=>setEditNote(note)}>&#127919;</button>
                                </div>
                            </div>
                            <div className='px-4 pt-6 pb-2 bg-white'>
                                <p className='h-[200px] overflow-auto'>{note.note_content}</p>

                                <p className='text-right text-xs font-bold'>Last modified: {note.last_update}</p>
                                
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='text-center'>
                {!isLoading && !notes.length ? <p className='mt-5'>No notes have been created yet.</p>:""}
                
                <button command="show-modal" commandfor="dialog" className='py-[7px] text-center w-[120px] rounded-lg bg-green-500/70 font-semibold text-green-900 mt-5'>Add Note</button>
            </div>


            <AddTask />
            <EditTask note = {editNote} updateTasks = {updateTasks}/>
            
        </div>
    )
}

export default page