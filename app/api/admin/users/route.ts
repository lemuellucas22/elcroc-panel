import { NextResponse } from 'next/server'
import { users, addUser } from '@/app/lib/users'

export async function POST(req: Request) {
  const data = await req.json()

  const exists = users.find(u => u.username === data.username)
  if (exists) {
    return NextResponse.json({ error: 'Usuário já existe' }, { status: 400 })
  }

  addUser({
    username: data.username,
    password: data.password,
    role: data.role,
    expiresAt: data.expiresAt,
    active: true
  })

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json(users)
}