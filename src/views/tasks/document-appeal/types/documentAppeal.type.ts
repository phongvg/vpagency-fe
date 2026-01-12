import { User } from '@/@types/user'

export enum DocumentAppealStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface DocumentAppeal {
  id: string
  name: string
  status: DocumentAppealStatus
  appealDate: Date
  platform: string
  appealCount: number
  successCount?: number
  assignedUsers: User[]
  creatorId: string
  creator?: User
  note?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateDocumentAppealRequest {
  name: string
  appealDate: Date
  platform: string
  appealCount: number
  successCount?: number
  assignedUserIds: string[]
  note?: string
}

export interface UpdateDocumentAppealRequest extends Partial<CreateDocumentAppealRequest> {
  status?: DocumentAppealStatus
}

export interface GroupedDocumentAppeals {
  [DocumentAppealStatus.PENDING]: DocumentAppeal[]
  [DocumentAppealStatus.IN_PROGRESS]: DocumentAppeal[]
  [DocumentAppealStatus.COMPLETED]: DocumentAppeal[]
  [DocumentAppealStatus.CANCELLED]: DocumentAppeal[]
}
