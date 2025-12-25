export type DashboardProjectStat = {
  totalProjects: number
  activeProjects: number
  activeProjectsRate: number
  totalTasksAssignedToday: number
  totalTasksDueToday: number
  totalTasksCompletedToday: number
  totalSpentToday: number
}

export type DashboardMonthlySpendingStat = {
  cost: number[]
  holdRevenue: number[]
  profit: number[]
  receivedRevenue: number[]
  month: number
}

export type DashboardTopProjectByProfit = {
  projectId: string
  projectName: string
  profit: number
}
