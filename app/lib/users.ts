export type User = {
  id: number
  username: string
  password: string
  role: 'admin' | 'user'
  expiresAt?: number
}

export let users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    role: 'admin',
    expiresAt: new Date('2026-12-31').getTime()
  }
]