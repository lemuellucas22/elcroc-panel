import { users } from '@/app/lib/users'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminPage() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('session')?.value

  // Se não tiver sessão, redireciona para login
  if (!sessionCookie) {
    redirect('/login')
  }

  // Procura o usuário logado
  const user = users.find(u => u.username === sessionCookie)

  // Se não existir ou não for admin, redireciona para login
  if (!user || user.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Painel Admin – El croc foods</h1>
      <p>Bem-vindo, {user.username}</p>

      <h2>Lista de usuários</h2>
      <ul>
        {users.map(u => (
          <li key={u.username}>
            {u.username} — {u.role}
          </li>
        ))}
      </ul>
    </div>
  )
}