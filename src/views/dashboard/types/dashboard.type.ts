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
  data: number[]
  month: number
}
