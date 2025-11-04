export type AdsAccountDailyMetric = {
  id: string
  adsAccountId: string
  date: Date
  clicks: number
  spent: number
  cpc: number
  createdAt: Date
  updatedAt: Date
}

export type CreateAdsAccountDailyMetricRequest = {
  adsAccountId: string
  clicks: number
  spent: number
  cpc?: number
}

export type UpdateAdsAccountDailyMetricRequest = {
  clicks?: number
  spent?: number
  cpc?: number
}

export type AdsAccountDailyMetricListFilterRequest = {
  page?: number
  limit?: number
  adsAccountId?: string
  fromDate?: string
  toDate?: string
}

export type AdsAccountDailyMetricStatistics = {
  totalSpent: number
  totalClicks: number
  averageCpc: number
  dateRange: {
    from: string | null
    to: string | null
  }
}
