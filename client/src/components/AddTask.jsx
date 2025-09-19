"use client"

import instance from '@/utils/axiosInstance'
import React, { useState } from 'react'

const AddTask = (props) => {
    const axiosInstance = instance
    const [note, setNote] = useState({
        note_title: "",
        note_content: ""
    })
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(note)
        axiosInstance.post(`/notes/`, note, {withCredentials: true})
        .then(res => {
            props.updateTasks()
            alert("Created successfully")
        })
        .catch(err => {
            console.log(err.response)
            alert("Something went wrong. Try again.")
        })
    }

    const changeHandler = (event) =>{
        const tempNote = {...note}
        tempNote[event.target.name] = event.target.value
        setNote(tempNote)
    }
  return (
    <el-dialog>
                <dialog id="dialog" aria-labelledby="dialog-title" className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
                    <el-dialog-backdrop className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

                    <div tabIndex="0" className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                        <el-dialog-panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                            <div className='rounded-lg overflow-hidden border-2 border-orange-900 note-dialog'>
                                <div className='flex justify-between bg-orange-800/40 py-1 px-4 border-b-2 border-orange-900 items-center'>
                                    <p className='font-bold '>Add Notes</p>
                                    <button className='flex gap-2 text-red-700/35 cursor-pointer' command="close" commandfor="dialog">
                                        &#10006;
                                    </button>
                                </div>
                                <div className='px-4 py-6'>
                                    <form onSubmit = {submitHandler}>
                                        <input type="text" placeholder='Title' id="title" className='block mb-1 border-2 border-orange-900 bg-white rounded-lg px-2 py-1 w-full mb-5' onChange = {changeHandler} name = "note_title" value = {note.note_title}></input>
                                        <textarea placeholder='Content' id="content" className='block mb-1 border-2 border-orange-900 bg-white rounded-lg px-2 py-1 w-full' rows="8" onChange = {changeHandler} name = "note_content" value = {note.note_content}></textarea>
                                        <div className='mt-10 flex justify-end gap-3'>
                                            <button className='py-[7px] text-center w-[120px] rounded-lg bg-green-600/80 font-semibold text-white'>Add</button>
                                            <button type="button" command="close" commandfor="dialog" className='py-[7px] text-center w-[120px] rounded-lg bg-red-500/80 font-semibold text-blue-900 text-white'>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>
  )
}

export default AddTask