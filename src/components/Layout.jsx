import React from 'react'
import{ Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
const Layout = () => {
  return (
    <div>
      <Header/>
      <div className='container mx-auto mt-4'>
        <Outlet/>
    </div>
    <Footer/>
    </div>
  )
}

export default Layout
