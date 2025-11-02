import { ProjectDailyReport } from '@/@types/projectDailyReport'
import { Card } from '@/components/ui'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { useMemo } from 'react'

type Props = {
  reports: ProjectDailyReport[]
}

export default function ProjectDailyReportStatistics({ reports }: Props) {
  const statistics = useMemo(() => {
    if (!reports || reports.length === 0) {
      return {
        totalSpent: 0,
        totalClicks: 0,
        averageCpc: 0,
        totalRef: 0,
        totalFtd: 0,
        dateRange: {
          from: null,
          to: null,
        },
      }
    }

    const totalSpent = reports.reduce((sum, report) => sum + report.totalSpent, 0)
    const totalClicks = reports.reduce((sum, report) => sum + report.totalClicks, 0)
    const averageCpc = totalClicks > 0 ? totalSpent / totalClicks : 0
    const totalRef = reports.reduce((sum, report) => sum + report.totalRef, 0)
    const totalFtd = reports.reduce((sum, report) => sum + report.totalFtd, 0)

    const dates = reports.map((r) => new Date(r.date).getTime()).sort((a, b) => a - b)
    const fromDate = dates.length > 0 ? new Date(dates[0]) : null
    const toDate = dates.length > 0 ? new Date(dates[dates.length - 1]) : null

    return {
      totalSpent,
      totalClicks,
      averageCpc,
      totalRef,
      totalFtd,
      dateRange: {
        from: fromDate ? fromDate.toLocaleDateString('vi-VN') : null,
        to: toDate ? toDate.toLocaleDateString('vi-VN') : null,
      },
    }
  }, [reports])

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng chi tiêu</span>
          <span className="font-bold text-gray-700 text-2xl">{formatVietnameseMoney(statistics.totalSpent)}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng lượt click</span>
          <span className="font-bold text-gray-700 text-2xl">{statistics.totalClicks.toLocaleString('vi-VN')}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">CPC trung bình</span>
          <span className="font-bold text-gray-700 text-2xl">{formatVietnameseMoney(statistics.averageCpc)}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng REF</span>
          <span className="font-bold text-gray-700 text-2xl">{statistics.totalRef.toLocaleString('vi-VN')}</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col">
          <span className="mb-2 font-semibold text-gray-600 text-sm">Tổng FTD</span>
          <span className="font-bold text-gray-700 text-2xl">{statistics.totalFtd.toLocaleString('vi-VN')}</span>
        </div>
      </Card>
    </div>
  )
}
