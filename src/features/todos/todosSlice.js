import { client } from "../../api/client"

const initialState = [
    //     { id: 0, text: 'Learn React', completed: true },
    //     { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    //     { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
]


function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

export async function fetchTodos(dispatch, getState) {
    const stateBefore = getState()
    console.log('Todos before dispatch: ', stateBefore.todos.length)

    const response = await client.get('/fakeApi/todos')
    dispatch({ type: 'todos/todosLoaded', payload: response.todos })

    const stateAfter = getState()
    console.log('Todos after dispatch: ', stateAfter.todos.length)
}

// Write a synchronous outer function that receives the `text` parameter:
export function saveNewTodo(text) {
    // And then creates and returns the async thunk function:
    return async function saveNewTodoThunk(dispatch, getState) {
        // ✅ Now we can use the text value and send it to the server
        const initialTodo = { text }
        const response = await client.post('/fakeApi/todos', { todo: initialTodo })
        dispatch({ type: 'todos/todoAdded', payload: response.todo })
    }
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded': {
            // Can return just the new todos array - no extra object around it
            return [
                ...state,
                action.payload
            ]
        }
        case 'todos/todoToggled': {
            return state.map(todo => {
                if (todo.id !== action.payload) {
                    return todo
                }

                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
        }
        case 'todos/todosLoaded': {
            // Can return just the new todos array - no extra object around it
            return action.payload
        }
        default:
            return state
    }
}