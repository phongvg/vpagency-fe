import { User } from '@/@types/user'

export type ProjectDailyReport = {
  id: string
  projectId: string
  date: Date
  runnerId?: string | null
  linkDeployed?: string | null
  totalSpent: number
  totalClicks: number
  totalCpc: number
  highestCpc: number
  totalRef: number
  costPerRef: number
  totalFtd: number
  costPerFtd: number
  createdAt: Date
  updatedAt: Date
  runner: User | null
}

export type CreateProjectDailyReportRequest = {
  projectId: string
  date: string | Date
  runnerId?: string
  linkDeployed?: string
  totalSpent?: number
  totalClicks?: number
  totalCpc?: number
  highestCpc?: number
  totalRef?: number
  costPerRef?: number
  totalFtd?: number
  costPerFtd?: number
}

export type UpdateProjectDailyReportRequest = {
  date?: string | Date
  runnerId?: string
  linkDeployed?: string
  totalSpent?: number
  totalClicks?: number
  totalCpc?: number
  highestCpc?: number
  totalRef?: number
  costPerRef?: number
  totalFtd?: number
  costPerFtd?: number
}

export type ProjectDailyReportListFilterRequest = {
  page?: number
  limit?: number
  projectId?: string
  runnerId?: string
  fromDate?: string
  toDate?: string
}
