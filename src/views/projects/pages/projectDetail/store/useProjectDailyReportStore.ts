import { ProjectDailyReport, ProjectDailyReportListFilterRequest } from '@/@types/projectDailyReport'
import { create } from 'zustand'

type ProjectDailyReportStore = {
  filter: ProjectDailyReportListFilterRequest
  setFilter: (filter: ProjectDailyReportListFilterRequest) => void
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  selectedReport: ProjectDailyReport | null
  setSelectedReport: (report: ProjectDailyReport | null) => void
}

export const useProjectDailyReportStore = create<ProjectDailyReportStore>((set) => ({
  filter: {
    page: 1,
    limit: 10,
  },
  setFilter: (filter) => set({ filter }),
  dialogOpen: false,
  setDialogOpen: (open) => set({ dialogOpen: open }),
  selectedReport: null,
  setSelectedReport: (report) => set({ selectedReport: report }),
}))
