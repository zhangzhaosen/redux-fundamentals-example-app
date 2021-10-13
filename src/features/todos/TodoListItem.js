import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

//import { ReactComponent as TimesSolid } from './times-solid.svg'

import { availableColors, capitalize } from '../filters/colors'
import { selectTodoById, todoChangeColor } from './todosSlice'

const TodoListItem = ({ todoId, onColorChange, onDelete }) => {

    //const selectTodoById = (state, todoId) => { return state.todos.entities.find(todo => todo.id === todoId) }

    const todo = useSelector(state => selectTodoById(state, todoId))

    const { text, completed, color } = todo

    const dispatch = useDispatch()

    const handleCompletedChanged = () => {
        dispatch({ type: 'todos/todoToggled', payload: todo.id })
    }

    const handleColorChanged = (e) => {
        //onColorChange(e.target.value)
        dispatch(todoChangeColor(todo.id, e.target.value))
    }

    const colorOptions = availableColors.map((c) => (
        <option key={c} value={c}>
            {capitalize(c)}
        </option>
    ))

    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={completed}
                        onChange={handleCompletedChanged}
                    />
                    <div className="todo-text">{text}</div>
                </div>
                <div className="segment buttons">
                    <select
                        className="colorPicker"
                        value={color}
                        style={{ color }}
                        onChange={handleColorChanged}
                    >
                        <option value=""></option>
                        {colorOptions}
                    </select>
                    <button className="destroy" onClick={onDelete}>

                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem
