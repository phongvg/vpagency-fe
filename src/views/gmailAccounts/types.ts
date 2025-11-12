import { CommonFilterRequest } from '@/@types/common'

export type GmailAccountFilterRequest = CommonFilterRequest

export type CreateGmailAccountRequest = {
  name: string
  password: string
  recoverMail: string | null
  recoverMailPassword: string | null
  code2fa: string | null
  phone: string | null
  proxy: string | null
  proxyPassword: string | null
  price: number
}

export type UpdateGmailAccountRequest = {
  name?: string
  password?: string
  recoverMail?: string | null
  recoverMailPassword?: string | null
  code2fa?: string | null
  phone?: string | null
  proxy?: string | null
  proxyPassword?: string | null
  price?: number
  assignedUserId?: string | null
}
