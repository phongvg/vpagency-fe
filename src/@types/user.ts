export type User = {
  id: string
  username: string
  telegramId: string
  email: string | null
  firstName: string | null
  lastName: string | null
  avatar: string | null
  roles: string[]
  status: string
  createdAt: Date
  updatedAt: Date
}

export type UserInfoResponse = User

export type UpdateUserInfoPayload = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string | null
}
