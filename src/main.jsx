import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Header/>
  <App />
    <Outlet />
    <Footer/>
  </BrowserRouter>
);
