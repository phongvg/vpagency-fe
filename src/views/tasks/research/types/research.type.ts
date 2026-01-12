import { User } from '@/@types/user'

export enum ResearchStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ResearchDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface Research {
  id: string
  name: string
  status: ResearchStatus
  startDate: Date
  content: string
  difficulty: ResearchDifficulty
  result?: string
  assignedUsers: User[]
  creatorId: string
  creator?: User
  note?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateResearchRequest {
  name: string
  startDate: Date
  content: string
  difficulty: ResearchDifficulty
  result?: string
  assignedUserIds: string[]
  note?: string
}

export interface UpdateResearchRequest extends Partial<CreateResearchRequest> {
  status?: ResearchStatus
}

export interface GroupedResearches {
  [ResearchStatus.PENDING]: Research[]
  [ResearchStatus.IN_PROGRESS]: Research[]
  [ResearchStatus.COMPLETED]: Research[]
  [ResearchStatus.CANCELLED]: Research[]
}
