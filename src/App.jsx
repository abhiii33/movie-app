import React from 'react'

import{ Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
const App = () => {
  return (
     <div>
      <Header/>
      <div className='container mx-auto mt-4'>
        <Outlet/>
    </div>

    </div>
  )
}

export default App