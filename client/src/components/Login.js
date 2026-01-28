import React, { useState } from 'react';
import { request } from '../api';

export default function Login({ onAuth }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault(); setError(null);
    try {
      const { token, user } = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      localStorage.setItem('token', token);
      onAuth(user);
    } catch (err) { setError(err.message); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Login</h3>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
