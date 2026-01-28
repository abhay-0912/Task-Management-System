import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import { request } from './api';

export default function App(){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      request('/api/auth/me')
        .then(setUser)
        .catch(()=>{ localStorage.removeItem('token'); setUser(null); });
    }
  },[]);

  const handleLogout = () => { localStorage.removeItem('token'); setUser(null); };

  return (
    <div className="app">
      <header>
        <h1>Task Management</h1>
        {user && <div>
          <strong>{user.name}</strong> ({user.role}) <button onClick={handleLogout}>Logout</button>
        </div>}
      </header>
      <main>
        {!user ? (
          <div className="auth">
            <Login onAuth={(u)=>setUser(u)} />
            <Register onAuth={(u)=>setUser(u)} />
          </div>
        ) : (
          <TaskList user={user} />
        )}
      </main>
    </div>
  );
}
