import { NextResponse } from 'next/server'
import { users } from '@/app/lib/users'

export async function POST(req: Request) {
  const { id, role } = await req.json()

  const user = users.find(u => u.id === id)

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  user.role = role

  return NextResponse.json({ ok: true })
}