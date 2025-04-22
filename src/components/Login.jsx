import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { createAccount ,login } from '../appwrite/auth'
const Login = () => {
  const navigate = useNavigate()
  const{register,handleSubmit} = useForm()
const submitlogin = async(data)=>{
  const user = await login(data.email,data.password)
  if(user){
    navigate('/home')
}
}
  return (
    <div>
      <form action="" onSubmit={handleSubmit(submitlogin)}>
      <input type="text" label="email" {...register("email",{required:true})}
    />
    <input type="password" label="password" {...register("password",{required:true})} />
    <button type="submit" className="w-full"> log in </button>
      </form>
    </div>
  )
}

export default Login