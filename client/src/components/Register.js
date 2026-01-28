import React, { useState } from 'react';
import { request } from '../api';

export default function Register({ onAuth }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault(); setError(null);
    try {
      const { token, user } = await request('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
      localStorage.setItem('token', token);
      onAuth(user);
    } catch (err) { setError(err.message); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Register</h3>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
