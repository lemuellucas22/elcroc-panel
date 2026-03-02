import { users } from '@/app/lib/users'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const cookieStore = await cookies()
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
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Usuário</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Cargo</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.username}>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{u.username}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{u.role}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                <select
                  defaultValue={u.role}
                  onChange={async e => {
                    const newRole = e.target.value
                    try {
                      await fetch('/api/admin/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: u.username, role: newRole })
                      })
                      alert(`Cargo de ${u.username} alterado para ${newRole}`)
                      window.location.reload()
                    } catch (err) {
                      alert('Erro ao alterar cargo')
                    }
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}