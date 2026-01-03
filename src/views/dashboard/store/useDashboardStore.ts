import { ProjectReportsFilterRequest } from '@/@types/statistic'
import { create } from 'zustand'

export type DashboardState = {
  filters: ProjectReportsFilterRequest
  setFilters: (filters: ProjectReportsFilterRequest) => void
  clearFilters: () => void
}

export const useDashboardStore = create<DashboardState>()((set, _, store) => ({
  filters: {
    fromDate: undefined,
    toDate: undefined,
    projectName: undefined,
    projectId: '',
    runnerId: '',
    page: 1,
    limit: 10,
  },
  setFilters: (filters: ProjectReportsFilterRequest) => set({ filters }),
  clearFilters: () => set(store.getInitialState()),
}))
