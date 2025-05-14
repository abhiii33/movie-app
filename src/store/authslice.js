import { createSlice } from "@reduxjs/toolkit";
const authslice = createSlice({
    name:"auth",
    initialState:{
        status:false,
        data:null
    },
    reducers:{
        login:(state,action)=>{
            state.status = true
            state.data = action.payload
        },
        logout:(state)=>{
            state.status = false
        }
    }
}) 


export const {login , logout} = authslice.actions
export default authslice.reducer
