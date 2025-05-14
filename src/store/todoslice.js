import { createSlice } from "@reduxjs/toolkit";
const todoslice = createSlice({
    name:"todo",
    initialState:{
        todos:[{
          id:Date.now(),
          isActive:false, 
          title:'',
          content:''
        }]
    },
    reducers:{
        addTodo:(state,action)=>{
            const newtodo = {
                id:Date.now(),
                isActive:false, 
                title:action.payload.title,
                content:action.payload.content
            } 
            state.todos.push(newtodo)
          console.log("state",state.todos);
        },
        deleteTodo:(state)=>{
              state.todos = state.todos.filter((todo)=> todo.id !== action.payload.id)
        }
    }
}) 


export const {addTodo , deleteTodo} = todoslice.actions
export default todoslice.reducer
