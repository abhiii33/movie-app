import React from 'react'
import { NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <div>
      <nav>
        <div><h1>logo</h1></div>
        <ul className='flex justify-between bg-gray-800 p-4 text-white'>

            <li >
            <NavLink to="/" className="text-blue-500">Home</NavLink>
            </li>
            <li >
            <NavLink to="/signup" className="text-blue-500">Signup</NavLink>        
            </li>
            <li >      
            <NavLink to="/login" className="text-blue-500">Login</NavLink>
            </li>
            <li >      
            <NavLink to="/logout" className="text-blue-500">logout</NavLink>
            </li>
        </ul>

      </nav>
    </div>
  )
}

export default Header
