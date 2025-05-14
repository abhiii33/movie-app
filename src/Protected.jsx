import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

const Protected = () => {
  const navigate = useNavigate();
  const authstatus = useSelector((state) => state.auth.status);  // Get auth status from Redux

  useEffect(() => {
   
    if (!authstatus) {
      navigate('/login');
    }
  }, [authstatus, navigate]);


  if (authstatus) {
    console.log("true");
    
  return <Outlet /> 
  }
return null;
};

export default Protected;
