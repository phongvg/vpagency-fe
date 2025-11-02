import { Card } from '@/components/ui'
import DailyMetricStatistics from '@/views/adsAccounts/pages/adsAccountDetail/components/DailyMetricStatistics'
import DailyMetricTableTools from '@/views/adsAccounts/pages/adsAccountDetail/components/DailyMetricTableTools'
import DailyMetricTable from '@/views/adsAccounts/pages/adsAccountDetail/components/DailyMetricTable'
import DailyMetricFormDialog from '@/views/adsAccounts/pages/adsAccountDetail/components/DailyMetricFormDialog'
import { useGetDailyMetricsQuery } from '@/views/adsAccounts/pages/adsAccountDetail/hooks/useDailyMetricQueries'
import { useDailyMetricStore } from '@/views/adsAccounts/pages/adsAccountDetail/store/useDailyMetricStore'
import { useEffect } from 'react'

type DailyMetricsSectionProps = {
  adsAccountId: string
}

export default function DailyMetricsSection({ adsAccountId }: DailyMetricsSectionProps) {
  const { filter, setFilter } = useDailyMetricStore()

  useEffect(() => {
    setFilter({ ...filter, adsAccountId })
  }, [adsAccountId])

  const { data: getDailyMetricsResponse } = useGetDailyMetricsQuery({
    ...filter,
    adsAccountId,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h4 className="font-bold text-lg">Chỉ số hàng ngày</h4>
      </div>

      <DailyMetricStatistics metrics={getDailyMetricsResponse?.items ?? []} />

      <Card>
        <DailyMetricTableTools />
        <DailyMetricTable adsAccountId={adsAccountId} />
      </Card>

      <DailyMetricFormDialog adsAccountId={adsAccountId} />
    </div>
  )
}
