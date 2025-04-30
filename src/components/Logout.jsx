import React from 'react'
import {currentuser, logout } from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const navigate = useNavigate()
    const userlogout = async()=>{
        try {
            
        
            const res = await logout()
            console.log(res);
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