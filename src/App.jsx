import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Layout from './components/Layout'
import {  Routes, Route } from 'react-router-dom';
const App = () => {
  
  console.log("App loaded");
  return (
   
    
    <Routes>
      <Route path="/" element={<Layout/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
 
  
   
          
    
  )
}

export default App