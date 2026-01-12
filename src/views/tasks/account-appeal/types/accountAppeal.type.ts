import { User } from '@/@types/user'

export enum AccountAppealStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface AccountAppeal {
  id: string
  name: string
  status: AccountAppealStatus
  appealDate: Date
  appealCount: number
  successCount?: number
  assignedUsers: User[]
  creatorId: string
  creator?: User
  note?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateAccountAppealRequest {
  name: string
  appealDate: Date
  appealCount: number
  successCount?: number
  assignedUserIds: string[]
  note?: string
}

export interface UpdateAccountAppealRequest extends Partial<CreateAccountAppealRequest> {
  status?: AccountAppealStatus
}

export interface GroupedAccountAppeals {
  [AccountAppealStatus.PENDING]: AccountAppeal[]
  [AccountAppealStatus.IN_PROGRESS]: AccountAppeal[]
  [AccountAppealStatus.COMPLETED]: AccountAppeal[]
  [AccountAppealStatus.CANCELLED]: AccountAppeal[]
}
