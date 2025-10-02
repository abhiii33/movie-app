import React,{useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
import{useDispatch,useSelector} from 'react-redux'
import {addTodo, deleteTodo, updateTodo} from '../store/todoslice'
const SearchBox = () => {
  const[edit,setEdit] = useState(false)
  const todos = useSelector((state)=> state.todo.todos)
  const dispatch = useDispatch()
     const{register,handleSubmit,reset , formState:{isSuccessfull}} =useForm()
     const submit = (data)=>{
console.log(data);
dispatch(addTodo(data))
     }
     const updater = (data)=>{
      // console.log(data);
      
 setEdit(true)
 dispatch(updateTodo(data))
     }
     
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
      {edit && 
        <form onSubmit={handleSubmit(updater)}>
          <input type="text"
    {...register("title",{required:true})}/>
    <input type="text" 
    {...register("content",{required:true})} />
        <button>
          updaterr here
        </button>
        </form>
    }
   <div> {todos.map((todo)=> 
      {return <div className="flex" key={todo.id}>
        <h1>{todo.title}</h1>
        <p>{todo.content}</p>
        <button onClick={()=>{dispatch(deleteTodo(todo.id))}}>delete</button>
    <button onClick={()=>{dispatch(updateTodo(todo.id))}}>update</button>
      </div>}
    )}
   
    </div>

  </>
 )
}

export default SearchBox