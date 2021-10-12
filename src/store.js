import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import { print1, print2, print3 } from './exampleAddons/middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'


const alwaysReturnHelloMiddleware = storeAPI => next => action =>{
    const originalResult = next(action);  // Ignore the original result, return something else  
    return 'Hello!'
}

const composedEnhancer = composeWithDevTools(  // EXAMPLE: Add whatever middleware you actually want to use here  
    applyMiddleware(thunkMiddleware)  // other store enhancers if any
    )
const store = createStore(rootReducer, composedEnhancer)


export default store