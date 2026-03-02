export type User = {
  id: number
  user: string
  pass: string
  role: 'admin' | 'user'
  expires: string
}

export let users: User[] = [
  {
    id: 1,
    user: 'admin',
    pass: '123',
    role: 'admin',
    expires: '2026-12-31'
  }
]