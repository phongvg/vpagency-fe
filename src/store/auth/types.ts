import { User } from '@/@types/user'

export type AuthState = {
  isAuthenticated: boolean
  token: string | null
  user: User | null

  setSession: (token: string | null, user: User | null) => void
  updateUser: (user: Partial<User>) => void
  clearSession: () => void
}
