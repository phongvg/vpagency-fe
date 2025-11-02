import { AdsAccountDailyMetric, AdsAccountDailyMetricListFilterRequest } from '@/@types/adsAccountDailyMetric'
import { create } from 'zustand'

type DailyMetricStore = {
  filter: AdsAccountDailyMetricListFilterRequest
  setFilter: (filter: AdsAccountDailyMetricListFilterRequest) => void
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  selectedMetric: AdsAccountDailyMetric | null
  setSelectedMetric: (metric: AdsAccountDailyMetric | null) => void
}

export const useDailyMetricStore = create<DailyMetricStore>((set) => ({
  filter: {
    page: 1,
    limit: 10,
  },
  setFilter: (filter) => set({ filter }),
  dialogOpen: false,
  setDialogOpen: (open) => set({ dialogOpen: open }),
  selectedMetric: null,
  setSelectedMetric: (metric) => set({ selectedMetric: metric }),
}))
