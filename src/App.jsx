import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
import Layout from './components/Layout'
import Home from './components/Home'
import {  Routes, Route } from 'react-router-dom';
const App = () => {
  
  console.log("App loaded");
  return (
   
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
 
  
   
          
    
  )
}

export default App