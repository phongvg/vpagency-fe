import { CommonFilterRequest } from '@/@types/common'

export type GmailAccountFilterRequest = CommonFilterRequest

export type CreateGmailAccountRequest = {
  email: string
  password: string
  twofa: string | null
  phone: string | null
  proxy: string | null
  amount: number
  managerId: string | null
}

export type UpdateGmailAccountRequest = {
  email?: string
  password?: string
  twofa?: string | null
  phone?: string | null
  proxy?: string | null
  amount?: number
  managerId?: string | null
}
