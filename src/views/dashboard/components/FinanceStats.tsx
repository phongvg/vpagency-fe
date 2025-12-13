import Chart from '@/components/shared/Chart'
import { Card, Progress } from '@/components/ui'
import { formatUSD } from '@/helpers/formatUSD'
import { getDaysArrayInMonth, getDaysInMonth } from '@/helpers/getDaysArrayInMonth'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManagerOrAccounting } from '@/utils/checkRole'
import { useGetMonthlySpendingStat, useProjectStatQuery } from '@/views/dashboard/hooks/useStatisticQueries'
import { useMemo } from 'react'
import { NumericFormat } from 'react-number-format'

const FinanceStatsCard = ({ title, value }: { title: string; value: string | number | undefined }) => {
  return (
    <Card>
      <div className="flex flex-col">
        <span className="mb-2 font-semibold text-gray-600 text-sm">{title}</span>
        <span className="font-bold text-gray-700 text-2xl">{value}</span>
      </div>
    </Card>
  )
}

const ProgressInfo = ({ precent }: { precent?: number }) => {
  return (
    <div>
      <h3 className="font-bold">{precent}%</h3>
    </div>
  )
}

export default function FinanceStats() {
  const { user } = useAuthStore()
  const { data: projectStat } = useProjectStatQuery(isAdminOrManagerOrAccounting(user?.roles))
  const { data: monthlySpendingStat } = useGetMonthlySpendingStat(isAdminOrManagerOrAccounting(user?.roles))

  const getPerformanceLabel = (active?: number, total?: number) => {
    if (!active || !total) return 'Chưa có dữ liệu'

    const percent = Math.round((active / total) * 100)

    if (active === total) return 'Xuất sắc'
    if (percent >= 70) return 'Tốt'
    if (percent >= 50) return 'Trung bình'
    return 'Cần cải thiện'
  }

  const constructedData = useMemo(() => {
    return {
      series: [
        {
          name: 'Tổng chi tiêu',
          data: [
            ...(monthlySpendingStat?.data ?? []),
            ...Array(getDaysInMonth(monthlySpendingStat?.month) - (monthlySpendingStat?.data?.length ?? 0)).fill(0),
          ],
        },
      ],
      timeRange: getDaysArrayInMonth(monthlySpendingStat?.month),
    }
  }, [monthlySpendingStat])

  const totalSpentMonth = useMemo(() => {
    return monthlySpendingStat?.data?.reduce((acc, curr) => acc + curr, 0) || 0
  }, [monthlySpendingStat])

  return (
    <>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-2">
          <FinanceStatsCard title="Tổng dự án" value={projectStat?.totalProjects} />
          <FinanceStatsCard title="Dự án đang hoạt động" value={projectStat?.activeProjects} />
          <FinanceStatsCard title="Công việc được giao hôm nay" value={projectStat?.totalTasksAssignedToday} />
          <FinanceStatsCard title="Công việc hoàn thành hôm nay" value={projectStat?.totalTasksCompletedToday} />
          <FinanceStatsCard title="Tổng chi tiêu hôm nay" value={formatUSD(projectStat?.totalSpentToday)} />
        </div>

        <Card>
          <h4 className="mb-2">Tỷ lệ dự án hoạt động</h4>
          <p className="text-gray-500 text-sm">
            {projectStat?.activeProjects || 0} / {projectStat?.totalProjects || 0} dự án đang chạy
          </p>
          <div className="mt-6">
            <Progress
              variant="circle"
              percent={projectStat?.activeProjectsRate || 0}
              width={200}
              className="flex justify-center"
              strokeWidth={4}
              customInfo={<ProgressInfo precent={projectStat?.activeProjectsRate || 0} />}
            />
          </div>
          <div className="mt-6 text-center">
            <p className="font-semibold text-gray-600">Hiệu suất dự án</p>
            <h4 className="font-bold text-gray-700">
              {getPerformanceLabel(projectStat?.activeProjects, projectStat?.totalProjects)}
            </h4>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-6">
          <div>
            <p>Tổng chi tiêu tháng {monthlySpendingStat?.month}</p>
            <h4 className="font-bold">
              <NumericFormat thousandSeparator displayType="text" value={totalSpentMonth} prefix="$" />
            </h4>
          </div>
        </div>
        <Chart
          series={constructedData.series}
          xAxis={constructedData.timeRange}
          height="350px"
          customOptions={{ legend: { show: false } }}
        />
      </Card>
    </>
  )
}
