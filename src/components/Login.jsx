import React ,{useState}from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {set, useForm} from 'react-hook-form'
import {useDispatch,useSelector} from "react-redux"
import { createAccount ,login,currentuser,logout } from '../appwrite/auth'
import {login as Authlogin} from"../store/authslice"
const Login = () => {
  const[error,setError]= useState()
     const dispatch = useDispatch()
     const authstatus = useSelector((state)=> state.auth.status)
  console.log("authstatus",authstatus)
  const navigate = useNavigate()
  const{register,handleSubmit} = useForm()
const submitlogin = async(data)=>{

  const user = await login(data.email,data.password)
  if(user){
    const user = await currentuser()
    if (user)
   { dispatch(Authlogin(user))
    navigate('/')
    console.log("Login successful",user);}
}

}

  return (
    <>
    <div>
      <form action="" onSubmit={handleSubmit(submitlogin)}>
      <input type="text" label="email" {...register("email",{required:true})}
    />
    <input type="password" label="password" {...register("password",{required:true})} />
    <button type="submit" className="w-full"> log in </button>
      </form>
  
    </div>
  
     
        </>
  )
}

export default Login