import React,{useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
import{useDispatch,useSelector} from 'react-redux'
import {addTodo} from '../store/todoslice'
const SearchBox = () => {
  const todos = useSelector((state)=> state.todo.todos)
  
  const dispatch = useDispatch()
     const{register,handleSubmit,reset,formState,formState:{isSubmitSuccessful }} =useForm({defaultValues:{title:"",content:""}})
     const submit = (data)=>{
console.log(data);

dispatch(addTodo(data))
     }
     useEffect(()=>{
      if(formState.isSubmitSuccessful ){
        reset({title:"",content:""})
      }
     },[formState,reset])
 return(
  <>
  <div>Add Todo</div>
  <form action="" onSubmit={handleSubmit(submit)}>
    <input type="text"
    {...register("title",{required:true})}/>
    <input type="text" 
    {...register("content",{required:true})} />
    <button>add</button>
     </form>
    {todos.map((todo)=> 
      {return <div key={todo.id}>
        <h1>{todo.title}</h1>
        <p>{todo.content}</p>
      </div>}
    )}
 
  </>
 )
}

export default SearchBox