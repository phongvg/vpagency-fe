import { User } from '@/@types/user'
import { GmailStatus } from '@/views/masterData/gmailStatus/types/gmailStatus.type'

export type GmailAccount = {
  id: string
  name: string
  statusId: string | null
  status: GmailStatus
  assignedUserIds: string[]
  assignedUsers: User[]
  password: string
  recoverMail: string | null
  recoverMailPassword: string | null
  code2fa: string | null
  phone: string | null
  proxy: string | null
  price: number | null
  appPassword: string | null
  createdYear: number | null
  profileName: string | null
  creatorId: string
  creator: User | null
  createdAt: Date
  updatedAt: Date
}

export type UpdateGmailAccountRequest = Partial<GmailAccount>
