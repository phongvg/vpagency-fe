import { AdsAccountDailyMetric } from '@/@types/adsAccountDailyMetric'
import { Card } from '@/components/ui'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { useMemo } from 'react'

type Props = {
  metrics: AdsAccountDailyMetric[]
}

export default function DailyMetricStatistics({ metrics }: Props) {
  const statistics = useMemo(() => {
    if (!metrics || metrics.length === 0) {
      return {
        totalSpent: 0,
        totalClicks: 0,
        averageCpc: 0,
      }
    }

    const totalSpent = metrics.reduce((sum, metric) => sum + metric.spent, 0)
    const totalClicks = metrics.reduce((sum, metric) => sum + metric.clicks, 0)
    const averageCpc = totalClicks > 0 ? totalSpent / totalClicks : 0

    return {
      totalSpent,
      totalClicks,
      averageCpc,
    }
  }, [metrics])

  return (
    <div className="gap-4 grid grid-cols-3">
      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng chi tiêu</span>
          <span className="font-bold text-gray-700 text-2xl">{formatVietnameseMoney(statistics.totalSpent)}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng luợt click</span>
          <span className="font-bold text-gray-700 text-2xl">{statistics.totalClicks}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">CPC trung bình</span>
          <span className="font-bold text-gray-700 text-2xl">{formatVietnameseMoney(statistics.averageCpc)}</span>
        </div>
      </Card>
    </div>
  )
}
