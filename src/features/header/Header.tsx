import React, { FC, KeyboardEvent, KeyboardEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../todos/todosSlice'

import  {  AppDispatch } from '../../store'
//import { useAppDispatch } from '../../app/hooks'

const Header = () => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('idle')
    const dispatch =  useDispatch<AppDispatch>();


    const handleChange = e => setText(e.target.value)

    const handleKeyDown = async (e : KeyboardEvent )=> {

        const trimmedText = (e.target as HTMLInputElement).value.trim()
       
        // If the user pressed the Enter key:
        if (e.key === 'Enter' && trimmedText) {
            // Dispatch the "todo added" action with this text
            setStatus('loading')
            await dispatch(saveNewTodo(trimmedText))
            // And clear out the text input
            setText('')
            setStatus('idle')
        }
    }

    let isLoading = status === 'loading'
    let placeholder = isLoading ? '' : 'What needs to be done?'
    let loader = isLoading ? <div className="loader" /> : null

    return (
        <div className="header">
            <input
                type="text"
                placeholder="What needs to be done?"
                autoFocus={true}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            {loader}
        </div>
    )
}

export default Header