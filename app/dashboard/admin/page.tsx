'use client'

import { useEffect, useState } from 'react'

type User = {
  id: number
  username: string
  role: 'admin' | 'user'
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers)
  }, [])

  async function updateRole(id: number, role: 'admin' | 'user') {
    await fetch('/api/users/update-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role })
    })

    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, role } : u))
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Painel Administrativo</h1>

      {users.map(user => (
        <div key={user.id} style={{ marginBottom: 10 }}>
          <strong>{user.username}</strong> —

          <select
            value={user.role}
            onChange={e =>
              updateRole(user.id, e.target.value as 'admin' | 'user')
            }
            style={{ marginLeft: 10 }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  )
}