import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { availableColors, capitalize } from '../filters/colors'
import { StatusFilters, colorFilterChanged, statusFilterChanged } from '../filters/filtersSlice'
import { selectTodos, todosAllCompleted, todosCompletedCleared } from '../todos/todosSlice'

// Omit other footer components

const RemainingTodos = ({ count }) => {
    const suffix = count === 1 ? '' : 's'

    return (
        <div className="todo-count">
            <h5>Remaining Todos</h5>
            <strong>{count}</strong> item{suffix} left
        </div>
    )
}

const StatusFilter = ({ value: status, onChange }) => {
    const renderedFilters = Object.keys(StatusFilters).map((key) => {
        const value = StatusFilters[key]
        const handleClick = () => onChange(value)
        const className = value === status ? 'selected' : ''

        return (
            <li key={value}>
                <button className={className} onClick={handleClick}>
                    {key}
                </button>
            </li>
        )
    })

    return (
        <div className="filters statusFilters">
            <h5>Filter by Status</h5>
            <ul>{renderedFilters}</ul>
        </div>
    )
}

const ColorFilters = ({ value: colors, onChange }) => {
    const renderedColors = availableColors.map((color) => {
        const checked = colors.includes(color)
        const handleChange = () => {
            const changeType = checked ? 'removed' : 'added'
            onChange(color, changeType)
        }

        return (
            <label key={color}>
                <input
                    type="checkbox"
                    name={color}
                    checked={checked}
                    onChange={handleChange}
                />
                <span
                    className="color-block"
                    style={{
                        backgroundColor: color,
                    }}
                ></span>
                {capitalize(color)}
            </label>
        )
    })

    return (
        <div className="filters colorFilters">
            <h5>Filter by Color</h5>
            <form className="colorSelection">{renderedColors}</form>
        </div>
    )
}

const Footer = () => {
    const todosRemaining = useSelector(createSelector(
        selectTodos,
        todos => {
            const uncompletedTodos = todos.filter(todo => !todo.completed)
            return uncompletedTodos.length
        })
    )
    //debugger;

    const { status, colors } = useSelector(state => state.filters)

    const dispatch = useDispatch()


    const onColorChange = (color, changeType) =>
        dispatch(colorFilterChanged(color, changeType))

    const onStatusChange = (status) => dispatch(statusFilterChanged(status))


    const onMarkAllCompleted = ()=>{
        dispatch(todosAllCompleted())
    }
    const onRemoveCompleted = ()=>{
        dispatch(todosCompletedCleared())
    }
 

    // omit placeholder change handlers

    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button className="button" onClick = {onMarkAllCompleted}>Mark All Completed</button>
                <button className="button" onClick = {onRemoveCompleted} >Clear Completed</button>
            </div>

            <RemainingTodos count={todosRemaining} />
            <StatusFilter value={status} onChange={onStatusChange} />
            <ColorFilters value={colors} onChange={onColorChange} />
        </footer>
    )
}

export default Footer