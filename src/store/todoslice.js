import { createSlice } from "@reduxjs/toolkit";
const initialTodos = () => {
  try {
    const data = JSON.parse(localStorage.getItem("data"));
    return Array.isArray(data) ? data : []; 
  } catch {
    return [];
  }
};
const todoslice = createSlice({
    name:"todo",
    initialState:{
        todos:initialTodos()
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
            localStorage.setItem("data",JSON.stringify(state.todos))
          console.log("state",state.todos);
        },
        deleteTodo:(state)=>{
              state.todos = state.todos.filter((todo)=> todo.id !== action.payload.id)
        }
    }
}) 


export const {addTodo , deleteTodo} = todoslice.actions
export default todoslice.reducer
