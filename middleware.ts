import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { users } from '@/app/lib/users'

export function middleware(req: NextRequest) {
  const session = req.cookies.get('session')

  if (!session) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return
  }

  const user = users.find(u => u.username === session.value)

  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (user.expiresAt && Date.now() > user.expiresAt) {
    const res = NextResponse.redirect(
      new URL('/login?expired=true', req.url)
    )
    res.cookies.delete('session')
    return res
  }
}