import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { user, pass } = await req.json()

  // Usuário administrador inicial
  if (user === 'admin' && pass === 'admin123') {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('session', 'admin', {
      httpOnly: true,
      path: '/'
    })
    return res
  }

  return NextResponse.json(
    { error: 'Login inválido' },
    { status: 401 }
  )
}