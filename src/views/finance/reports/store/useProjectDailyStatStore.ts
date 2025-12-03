import { ProjectDailyStatFilterRequest } from '@/views/finance/reports/types/ProjectDailyStat.type'
import { create } from 'zustand'

export type ProjectDailyStatState = {
  filters: ProjectDailyStatFilterRequest

  setFilters: (filters: ProjectDailyStatFilterRequest) => void
}

export const useProjectDailyStatStore = create<ProjectDailyStatState>()((set, _, store) => ({
  filters: {
    fromDate: undefined,
    toDate: undefined,
    page: 1,
    limit: 10,
  },
  setFilters: (filters: ProjectDailyStatFilterRequest) => set({ filters }),
  clearFilters: () => set(store.getInitialState()),
}))
