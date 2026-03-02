import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { users } from '@/app/lib/users'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  const user = users.find(u => u.username === session)

  if (!user || user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Painel Administrativo</h1>
      <p>Bem-vindo, {user.username}</p>
      <p>Você tem permissão de administrador.</p>
    </div>
  )
}