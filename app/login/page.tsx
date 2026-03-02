'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const router = useRouter()

  async function handleLogin() {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      alert('Login inválido')
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <input placeholder="Usuário" onChange={e => setUser(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Senha" onChange={e => setPass(e.target.value)} />
      <br /><br />

      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}