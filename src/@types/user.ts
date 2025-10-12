import { StatusEnum } from '@/enums/status.enum'
import { Role } from '@/enums/role.enum'

export type User = {
  id: string
  username: string
  telegramId: string
  email: string | null
  firstName: string | null
  lastName: string | null
  avatar: string | null
  roles: Role[]
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

export type UpdateUserInfoPayload = {
  username?: string
  firstName: string
  lastName: string
  email: string
  password?: string
  avatar?: string | null
}

export type ResetPasswordResponse = {
  message: string
  user: User
}
