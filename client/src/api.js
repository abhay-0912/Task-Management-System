const API = process.env.REACT_APP_API || 'http://localhost:5000';

export async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(()=>({message:res.statusText}));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}
