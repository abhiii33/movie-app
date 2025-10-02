import { createSlice } from "@reduxjs/toolkit";
const initialtodos =()=> JSON.parse(localStorage.getItem("todos")) || []

const todoslice = createSlice({
    name:"todo",
    initialState:{
        todos: initialtodos()
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
            localStorage.setItem("todos",JSON.stringify(state.todos))
          console.log("state",state.todos);
        },
        deleteTodo:(state,action)=>{
             const n = state.todos.filter((todo)=> todo.id == action.payload.id)
              state.todos.pop(n)
              localStorage.setItem("todos",JSON.stringify(state.todos)
              )
        },
        updateTodo:(state,action)=>{
          
             state.todos = state.todos.map((todo)=>{
                  if(todo.id === action.payload.id)
                return {...todo,title:action.payload.title,content:action.payload.content}
             })
        }
    }
}) 


export const {addTodo , deleteTodo, updateTodo} = todoslice.actions
export default todoslice.reducer
