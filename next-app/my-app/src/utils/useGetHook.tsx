import { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from './api';
export default function useGetHook(endpoint,options) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(false);
   const fetchData = async(endpoint:any,options:any)=>{
        try {
            setLoading(true);
            setError(null);
            const response = await apiConfig.get(endpoint,options);
            const result = await response.data;
            setData(result);
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
            setSuccess(false);
        }
        finally{
            setLoading(false);
        }
   }
   useEffect(()=>{
        fetchData(endpoint,options);
   },[endpoint]);

   return {data,loading,error,success ,refetch:fetchData};
}