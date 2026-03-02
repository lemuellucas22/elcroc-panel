'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginContent() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const router = useRouter()
  const params = useSearchParams()

  const expired = params.get('expired')

  async function handleLogin() {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      const data = await res.json()
      alert(data.error)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      {expired && (
        <p style={{ color: 'red' }}>
          Seu acesso expirou. Fale com o administrador.
        </p>
      )}

      <input
        placeholder="Usuário"
        onChange={e => setUser(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Senha"
        onChange={e => setPass(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}