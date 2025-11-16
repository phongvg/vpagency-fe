import { User } from '@/@types/user'

export type GmailAccount = {
  id: string
  name: string
  password: string
  recoverMail: string | null
  recoverMailPassword: string | null
  code2fa: string | null
  phone: string | null
  proxy: string | null
  proxyPassword: string | null
  price: number
  manager: User | null
  creator: User | null
  createdAt: Date
  updatedAt: Date
}

export type UpdateGmailAccountRequest = Partial<GmailAccount>
