import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { users } from '@/app/lib/users'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  const user = users.find(u => u.username === session)

  if (!user) {
    redirect('/')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard – El croc foods</h1>
      <p>Bem-vindo, {user.username}</p>
      <p>Seu cargo: {user.role}</p>
    </div>
  )
}
<form action="/api/logout" method="POST">
  <button type="submit">Sair</button>
</form>