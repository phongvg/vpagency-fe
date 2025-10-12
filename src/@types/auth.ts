import { User } from '@/@types/user'

export type LoginRequest = {
  username: string
  password: string
}

export type SignInResponse = {
  token: string
  user: {
    userName: string
    authority: string[]
    avatar: string
    email: string
  }
}

export type LoginResponse = {
  ok: boolean
  accessToken: string
  refreshToken: string
  expiresAt: Date
  isOnboarding: boolean
  user: User
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
  userName: string
  email: string
  password: string
}

export type ForgotPassword = {
  email: string
}

export type ResetPassword = {
  password: string
}

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken?: string
}
