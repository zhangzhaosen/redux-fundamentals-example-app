//import { createSelector } from "reselect"
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'

import { client } from "../../api/client"
import { StatusFilters } from '../filters/filtersSlice'

// const initialState = {
//     status: 'idle',
//     entities: []
// }
//     { id: 0, text: 'Learn React', completed: true },
//     { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
//     { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }



function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
    status: 'idle'
})

// export const todosLoaded = todos => {
//     return { type: 'todos/todosLoaded', payload: todos }
// }
// export const todoAdded = todo => {
//     return { type: 'todos/todoAdded', payload: todo }
// }

// export const todoChangeColor = (todoId, color) => {
//     return { type: 'todos/todoColorChanged', payload: { todoId, color } }
// }

// export const todosLoading = () => {
//     return { type: 'todos/todosLoading' }
// }




// export async function fetchTodos(dispatch, getState) {
//     const stateBefore = getState()
//     console.log('Todos before dispatch: ', stateBefore.todos.length)

//     const response = await client.get('/fakeApi/todos')
//     dispatch(todosLoaded(response.todos))

//     const stateAfter = getState()
//     console.log('Todos after dispatch: ', stateAfter.todos.length)
// }

// Write a synchronous outer function that receives the `text` parameter:
// export function saveNewTodo(text) {
//     // And then creates and returns the async thunk function:
//     return async function saveNewTodoThunk(dispatch, getState) {
//         // ✅ Now we can use the text value and send it to the server
//         const initialTodo = { text }
//         const response = await client.post('/fakeApi/todos', { todo: initialTodo })
//         dispatch(todoAdded(response.todo))
//     }
// }

// export function fetchTodos() {
//     return async function fetchTodosThunk(dispatch, getState) {
//         dispatch(todosLoading())
//         const response = await client.get('/fakeApi/todos')
//         dispatch(todosLoaded(response.todos))
//     }


// }

// omit imports

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    //debugger;
    const response = await client.get('/fakeApi/todos')
    return response.todos
})

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async text => {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    return response.todo
})

// const selectTodoEntities = state => state.todos.entities

// export const selectTodos = createSelector(
//     selectTodoEntities,
//     entities => Object.values(entities)
// )

// export const selectTodoById = (state, todoId) => {
//     return selectTodoEntities(state)[todoId]
// }

// export const selectFilteredTodos = createSelector(
//     // First input selector: all todos  
//     selectTodos,

//     // Second input selector: all filter values  
//     state => state.filters,  // Output selector: receives both values  
//     (todos, filters) => {
//         //debugger;
//         const { status, colors } = filters
//         const showAllCompletions = status === StatusFilters.All
//         if (showAllCompletions && colors.length === 0) { return todos }
//         const completedStatus = status === StatusFilters.Completed    // Return either active or completed todos based on filter    
//         return todos.filter(todo => {
//             const statusMatches = showAllCompletions || todo.completed === completedStatus
//             const colorMatches = colors.length === 0 || colors.includes(todo.color)
//             return statusMatches && colorMatches
//         })
//     })

// // export const selectTodoById = (state, todoId) => {
// //     return selectTodos(state).find(todo => todo.id === todoId)
// // }





export const {
    selectAll: selectTodos,
    selectById: selectTodoById
} = todosAdapter.getSelectors(state => state.todos)

export const selectTodoIds = createSelector(  // First, pass one or more "input selector" functions:  
    selectTodos,  // Then, an "output selector" that receives all the input results as arguments  // and returns a final result value  
    todos => todos.map(todo => todo.id)
)

export const selectFilteredTodos = createSelector(  // First input selector: all todos  
    selectTodos,  // Second input selector: all filter values 
    state => state.filters,  // Output selector: receives both values  
    (todos, filters) => {
        const { status, colors } = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions && colors.length === 0) {
            return todos
        }
        const completedStatus = status === StatusFilters.Completed    // Return either active or completed todos based on filter    
        return todos.filter(todo => {
            const statusMatches = showAllCompletions || todo.completed === completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorMatches
        })
    })

export const selectFilteredTodoIds = createSelector(
    // Pass our other memoized selector as an input  
    selectFilteredTodos,
    // And derive data in the output selector  
    filteredTodos => filteredTodos.map(todo => todo.id)
)



// export default function todosReducer(state = initialState, action) {
//     switch (action.type) {

//         case 'todos/todosLoading': {
//             return {
//                 ...state,
//                 status: 'loading'
//             }
//             // state.status = 'loading'
//             // return state;
//         }
//         case 'todos/todoAdded': {
//             // Can return just the new todos array - no extra object around it
//             var todo = action.payload;
//             return {
//                 ...state,
//                 entities: {
//                     ...state.entities,
//                     [todo.id]: todo
//                 }
//             }
//         }
//         case 'todos/todoToggled': {
//             const todoId = action.payload
//             const todo = state.entities[todoId]
//             return {
//                 ...state,
//                 entities: {
//                     ...state.entities,
//                     [todoId]: {
//                         ...todo,
//                         completed: !todo.completed
//                     }
//                 }
//             }
//         }
//         case 'todos/todoColorChanged': {
//             var { todoId, color } = action.payload

//             const todo = state.entities[todoId]
//             return {
//                 ...state,
//                 entities: {
//                     ...state.entities,
//                     [todoId]: {
//                         ...todo,
//                         color
//                     }
//                 }
//             }
//         }
//         case 'todos/todoDeleted': {
//             const newEntities = { ...state.entities }
//             delete newEntities[action.payload]
//             return {
//                 ...state,
//                 entities: newEntities
//             }
//         }
//         case 'todos/allCompleted': {
//             const newEntities = { ...state.entities }
//             Object.values(newEntities).forEach(todo => {
//                 newEntities[todo.id] = { ...todo, completed: true }
//             })
//             return { ...state, entities: newEntities }
//         }

//         case 'todos/completedCleared': {
//             const newEntities = { ...state.entities }

//             Object.values(newEntities).forEach(todo => {
//                 if (todo.completed) { delete newEntities[todo.id] }
//             })
//             return { ...state, entities: newEntities }
//         }
//         case 'todos/todosLoaded': {
//             const newEntities = {}
//             action.payload.forEach(todo => { newEntities[todo.id] = todo })

//             return {
//                 ...state,
//                 status: 'idle',
//                  entities: newEntities
//             }
//         }
//         default:
//             return state
//     }
// }


const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state, action) {
            const todo = action.payload
            state.entities[todo.id] = todo
        },
        todoToggled(state, action) {
            const todoId = action.payload
            const todo = state.entities[todoId]
            todo.completed = !todo.completed
        },
        todoColorSelected: {
            reducer(state, action) {
                const { color, todoId } = action.payload
                state.entities[todoId].color = color
            },
            prepare(todoId, color) {
                return { payload: { todoId, color } }
            }
        },
        // todoDeleted(state, action) {
        //     delete state.entities[action.payload]

        // },
        todoDeleted: todosAdapter.removeOne,

        todosAllCompleted(state, action) {
            Object.values(state.entities).forEach((todo) => {
                todo.completed = true
            })
        },
        // completedTodosCleared(state, action) {
        //     Object.values(state.entities).forEach((todo) => {
        //         if (todo.completed) {
        //             delete state.entities[todo.id]
        //         }
        //     })
        // },
        todosCompletedCleared(state, action) {
            const completedIds = Object.values(state.entities).filter(todo => todo.completed).map(todo => todo.id)
            todosAdapter.removeMany(state, completedIds)
        },
        // todosLoading(state, action) {
        //     state.status = 'loading'
        // },
        // todosLoaded(state, action) {
        //     const newEntities = {}
        //     action.payload.forEach((todo) => {
        //         newEntities[todo.id] = todo
        //     })
        //     state.entities = newEntities
        //     state.status = 'idle'
        // },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchTodos.fulfilled, (state, action) => {
            // const newEntities = {}
            // action.payload.forEach(todo => { newEntities[todo.id] = todo })
            // state.entities = newEntities
            state.status = 'idle'

            todosAdapter.setAll(state, action.payload)

        })
            // .addCase(saveNewTodo.fulfilled, (state, action) => {
            //     const todo = action.payload
            //     state.entities[todo.id] = todo

            // })
            .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
    }
})
export const {
    todoAdded,
    todoToggled,
    todoColorSelected,
    todoDeleted,
    todosLoaded,
    todosLoading,
    todosAllCompleted,
    todosCompletedCleared
} = todosSlice.actions

export default todosSlice.reducer