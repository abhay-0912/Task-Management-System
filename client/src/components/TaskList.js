import React, { useState, useEffect } from 'react';
import { request } from '../api';
import TaskForm from './TaskForm';

export default function TaskList({ user }){
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try { setTasks(await request('/api/tasks')); } catch (err) { setError(err.message); }
  };

  useEffect(()=>{ load(); },[]);

  const remove = async (id) => {
    if (!confirm('Delete?')) return;
    await request(`/api/tasks/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <TaskForm onSaved={load} editing={editing} onCancel={()=>setEditing(null)} />
      {error && <div className="error">{error}</div>}
      <div className="task-grid">
        {tasks.map(t=> (
          <div className="card" key={t._id}>
            <h4>{t.title}</h4>
            <p>{t.description}</p>
            <p><strong>Status:</strong> {t.status} <strong>Priority:</strong> {t.priority}</p>
            <p><small>Assigned: {t.assignedTo?.name || '—'}</small></p>
            <div className="actions">
              <button onClick={()=>setEditing(t)}>Edit</button>
              {(user.role==='admin' || t.createdBy===user.id || t.createdBy?._id===user.id) && <button onClick={()=>remove(t._id)}>Delete</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
