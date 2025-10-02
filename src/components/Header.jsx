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
            <NavLink to="/home" className="text-blue-500">Home</NavLink>
            </li>
            <li>
            <NavLink to="/product" className="text-blue-500">Product</NavLink>
            </li>
            <li>
            <NavLink to="/signup" className="text-blue-500">Signup</NavLink>        
            </li>
            <li>      
            <NavLink to="/login" className="text-blue-500">Login</NavLink>
            </li>
            <li>      
            <NavLink to="/searchbox" className="text-blue-500">searchbox</NavLink>
            </li>
           <li>      
            <NavLink to="/todo" className="text-blue-500">todo</NavLink>
            </li>
           
           <Logout/>
            
        </ul>

      </nav>
    </div>
  )
}

export default Header
