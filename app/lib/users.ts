export type User = {
  username: string
  password: string
  role: 'admin' | 'caixa' | 'cozinha'
  expiresAt: number | null // timestamp
}

export const users: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    expiresAt: null // nunca expira
  }
]