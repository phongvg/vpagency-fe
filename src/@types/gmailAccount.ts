import { User } from '@/@types/user'

export type GmailAccount = {
  id: string
  email: string
  password: string
  twofa: string | null
  phone: string | null
  proxy: string | null
  amount: number
  managerId: string | null
  manager: User | null
  createdAt: Date
  updatedAt: Date
}
