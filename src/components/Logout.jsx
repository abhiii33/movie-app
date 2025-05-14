import React from 'react'
import {currentuser, logout } from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {logout as AuthLogout} from"../store/authslice"
const Logout = () => {
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const userlogout = async()=>{
        try {
            
        
            const res = await logout()
            if (res)
                dispatch(AuthLogout())
    
            navigate('/login')
     
           
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div>
        <button onClick={userlogout}>logout</button>
    </div>
  )
}

export default Logout