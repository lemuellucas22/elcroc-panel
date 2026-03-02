import { NextResponse } from 'next/server'
import { users } from '@/app/lib/users'

export async function GET() {
  return NextResponse.json(users)
}