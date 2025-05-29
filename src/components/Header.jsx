import React from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector} from "react-redux"
import Logout from './Logout'
const Header = () => {

  const authstatus = useSelector((state)=> state.auth.status)
  console.log("authstatus",authstatus)
  return (
    <div>
      <nav>
        <div><h1>logo</h1></div>
        <ul className='flex justify-between bg-gray-800 p-4 text-white'>

            <li>
            <NavLink to="/home" className="text-3xl font-bold underline">Home</NavLink>
            </li>
            <li>
            <NavLink to="/signup" className="text-3xl font-bold underline">Signup</NavLink>        
            </li>
            <li>      
            <NavLink to="/login" className="text-3xl font-bold underline">Login</NavLink>
            </li>
            <li>      
            <NavLink to="/searchbox" className="text-3xl font-bold underline">searchbox</NavLink>
            </li>
             <li>      
            <NavLink to="/footer" className="text-3xl font-bold underline">fopter</NavLink>
            </li>
            {authstatus && 
           <Logout/>
            }
        </ul>

      </nav>
    </div>
  )
}

export default Header
