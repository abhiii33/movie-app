import {configureStore} from "@reduxjs/toolkit"
import auth from "./authslice"
import todo from "./todoslice"
import cart from "./cartslice"
const store = configureStore({
    reducer:{
        auth,
        todo,
        cart
    }
})
export default store