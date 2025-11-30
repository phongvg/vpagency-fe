import { create } from 'zustand'
import { ProjectStatsFilterRequest } from '@/views/projects/pages/projectDetail/types/projectDetail.type'

type ProjectDailyReportStore = {
  filter: ProjectStatsFilterRequest
  setFilter: (filter: ProjectStatsFilterRequest) => void
}

export const useProjectDailyReportStore = create<ProjectDailyReportStore>((set) => ({
  filter: {
    dateFrom: undefined,
    dateTo: undefined,
  },
  setFilter: (filter) => set({ filter }),
}))
