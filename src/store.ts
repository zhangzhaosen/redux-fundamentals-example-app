// import { createStore, applyMiddleware } from 'redux'
// import rootReducer from './reducer'
// import { print1, print2, print3 } from './exampleAddons/middleware'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunkMiddleware from 'redux-thunk'


// const alwaysReturnHelloMiddleware = storeAPI => next => action =>{
//     const originalResult = next(action);  // Ignore the original result, return something else  
//     return 'Hello!'
// }

// const composedEnhancer = composeWithDevTools(  // EXAMPLE: Add whatever middleware you actually want to use here  
//     applyMiddleware(thunkMiddleware)  // other store enhancers if any
//     )
// const store = createStore(rootReducer, composedEnhancer)

import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'
const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`   
        todos: todosReducer,
        filters: filtersReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store