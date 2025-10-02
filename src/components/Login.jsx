import React ,{useState}from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {set, useForm} from 'react-hook-form'
import axios from 'axios'
import {useDispatch,useSelector} from "react-redux"
// import { createAccount ,login,currentuser,logout } from '../appwrite/auth'
import {login as Authlogin} from"../store/authslice"
const Login = () => {
  const[error,setError]= useState()
     const dispatch = useDispatch()
     const authstatus = useSelector((state)=> state.auth.status)
  console.log("authstatus",authstatus)
  const navigate = useNavigate()
  const{register,handleSubmit} = useForm()
const submitlogin = async(data)=>{
 try {
   const senddata =async()=>{
       const response = await axios.post("http://localhost:4000/api/v1/user/login",data)
        if(response.status === 200){
          console.log("response",response.data.cookies);
          
          dispatch(Authlogin(response.data))
          navigate("/home")
   }
 } 
 senddata()
}catch(error) {
  console.log(error);
  
 }

}

  return (
    <>
    <div>
      <form action="" onSubmit={handleSubmit(submitlogin)}>
      <input type="text" label="email" placeholder="email" {...register("email",{required:true})}
    />
    <input type="password" label="password" placeholder="password" {...register("password",{required:true})} />
     <input type="text" label="username"placeholder="username" {...register("username",{required:true})} />
    <button type="submit" className="w-full"> log in </button>
      </form>
  
    </div>
  
     
        </>
  )
}

export default Login