import React, { use } from 'react'
import {useForm} from 'react-hook-form'
import { createAccount ,login } from '../appwrite/auth'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    console.log("Signup component loaded");
    const navigate = useNavigate()
    const{register,handleSubmit} = useForm() 
    const submit = async (data) => {
try {
     const session = await createAccount(data.email,data.password,data.username)
     if(session){
        login(data.email,data.password)
     }
     navigate('/')
} catch (error) {       
    console.error(error)
}
}
  return (
    <div>
        <form action="" onSubmit={handleSubmit(submit)}>  
    <input type="text" label="email" {...register("email",{required:true})}
    />
    <input type="text" label="username" {...register("username",{required:true})} />
     <input type="text" label="password" {...register("password",{required:true})}
    />
    <button type='submit' className="w-full bg-blue" > createAccount</button>
    </form>
        
    </div>
  )
}

export default Signup