import React, { useState, useEffect } from 'react';
import { request } from '../api';

export default function TaskForm({ onSaved, editing, onCancel }){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');

  useEffect(()=>{
    if (editing) {
      setTitle(editing.title || '');
      setDescription(editing.description || '');
      setStatus(editing.status || 'todo');
      setPriority(editing.priority || 'medium');
    }
  },[editing]);

  const submit = async (e) => {
    e && e.preventDefault();
    try {
      if (editing) {
        await request(`/api/tasks/${editing._id}`, { method: 'PUT', body: JSON.stringify({ title, description, status, priority }) });
      } else {
        await request('/api/tasks', { method: 'POST', body: JSON.stringify({ title, description, status, priority }) });
      }
      setTitle(''); setDescription(''); setStatus('todo'); setPriority('medium');
      onSaved && onSaved();
      onCancel && onCancel();
    } catch (err) { alert(err.message); }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>{editing ? 'Edit Task' : 'New Task'}</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
      <div className="row">
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="actions">
        <button type="submit">Save</button>
        {editing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
