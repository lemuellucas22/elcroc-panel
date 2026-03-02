import { NextResponse } from 'next/server'
import { users } from '@/app/lib/users'

export async function POST(req: Request) {
  const { user, pass } = await req.json()

  const found = users.find(
    u => u.username === user && u.password === pass
  )

  if (!found) {
    return NextResponse.json({ error: 'Login inválido' }, { status: 401 })
  }

  if (found.expiresAt && Date.now() > found.expiresAt) {
    return NextResponse.json(
      { error: 'Acesso expirado' },
      { status: 403 }
    )
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('session', found.username, {
    httpOnly: true,
    path: '/'
  })

  return res
}