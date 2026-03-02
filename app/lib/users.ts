export type User = {
  username: string
  password: string
  role: 'admin' | 'caixa' | 'cozinha'
  expiresAt: number | null
  active: boolean
}

export let users: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    expiresAt: null,
    active: true
  }
]

export function addUser(user: User) {
  users.push(user)
}

export function deactivateUser(username: string) {
  const user = users.find(u => u.username === username)
  if (user) user.active = false
}