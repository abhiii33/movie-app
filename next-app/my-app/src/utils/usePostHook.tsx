// utils/usePost.js
'use client';
import { useState } from 'react';
import apiConfig from './api';

export function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(null);

  const postData = async (endpoint, payload, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const res = await apiConfig.post(endpoint, payload, options);
      console.log(res.data);
      
      setResponse(res.data);
      setSuccess(true);
      return res.data;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, success, response };
}
