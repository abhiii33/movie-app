'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {usePost} from  '../../utils/usePostHook';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { postData, loading, error, success, response } = usePost();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await postData('/user/login', formData);
      console.log('Login successful:', data);
          console.log(data,"res");
          
      if (data?.token) localStorage.setItem('token', data.token);

      setAlertMessage('Login successful!');
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      setAlertMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Test Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {alertMessage && <p>{alertMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Login successful!</p>}
    </div>
  );
};

export default LoginPage;
