import { StatusEnum } from '@/enums/status.enum'

export type User = {
  id: string
  username: string
  telegramId: string
  email: string | null
  firstName: string | null
  lastName: string | null
  avatar: string | null
  roles: string[]
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

export type UpdateUserInfoPayload = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string | null
}
