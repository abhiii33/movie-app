import {configureStore} from "@reduxjs/toolkit"
import auth from "./authslice"
import todo from "./todoslice"
const store = configureStore({
    reducer:{
        auth,
        todo
    }
})
export default store