import React, { use } from 'react'
import {useForm} from 'react-hook-form'
import { createAccount ,login ,currentuser } from '../appwrite/auth'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {login as Authlogin} from"../store/authslice"
import{Button} from "@radix-ui/themes"
const Signup = () => {
    console.log("Signup component loaded");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{register,handleSubmit} = useForm() 
    const submit = async (data) => {
      try {
          // Create account also logs in the user
          const userData = await createAccount(data.email, data.password, data.username);
  
          if (userData) {
          const userData = await currentuser()
            if(userData)
            {
              dispatch(Authlogin(userData))
              navigate("/")
            }

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
    <Button type='submit' className="w-full bg-blue-500" > createAccount</Button>
    </form>
 
  
    </div>
  )
}

export default Signup