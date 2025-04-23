import React, { use } from 'react'
import {useForm} from 'react-hook-form'
import { createAccount ,login ,currentuser } from '../appwrite/auth'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    console.log("Signup component loaded");
    const navigate = useNavigate()
    const{register,handleSubmit} = useForm() 
    const submit = async (data) => {
      try {
          // Create account also logs in the user
          const newAccount = await createAccount(data.email, data.password, data.username);
  
          if (newAccount) {
            return await login(data.email, data.password);
          }
  } catch (error) { 
          console.error("Error creating account:", error);
          throw error;
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
    <button type='submit' className="w-full bg-blue-500" > createAccount</button>
    </form>
 
  
    </div>
  )
}

export default Signup