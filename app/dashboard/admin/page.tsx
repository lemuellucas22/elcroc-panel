'use client'

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([])
  const [form, setForm] = useState<any>({})

  async function loadUsers() {
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    setUsers(data)
  }

  async function createUser() {
    await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({})
    loadUsers()
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Administração</h1>

      <h2>Criar usuário</h2>
      <input placeholder="Usuário" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Senha" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="">Perfil</option>
        <option value="caixa">Caixa</option>
        <option value="cozinha">Cozinha</option>
      </select>

      <button onClick={createUser}>Criar</button>

      <h2>Usuários</h2>
      <ul>
        {users.map(u => (
          <li key={u.username}>
            {u.username} – {u.role} – {u.active ? 'Ativo' : 'Inativo'}
          </li>
        ))}
      </ul>
    </div>
  )
}