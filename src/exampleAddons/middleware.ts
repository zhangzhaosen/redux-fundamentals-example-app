import { Middleware } from "redux"
import { RootState } from "../store"

export const print1: Middleware<
    {},
    RootState
>
    = (storeAPI) => (next) => (action) => {
        console.log('1')
        return next(action)
    }

export const print2 = (storeAPI) => (next) => (action) => {
    console.log('2')
    return next(action)
}

export const print3 = (storeAPI) => (next) => (action) => {
    console.log('3')
    return next(action)
}
