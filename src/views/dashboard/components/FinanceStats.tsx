import Chart from '@/components/shared/Chart'
import { Card, Progress } from '@/components/ui'
import { formatUSD } from '@/helpers/formatUSD'
import { getDaysArrayInMonth, getDaysInMonth } from '@/helpers/getDaysArrayInMonth'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrAccounting, isAdminOrManagerOrAccounting } from '@/utils/checkRole'
import {
  useGetMonthlySpendingStat,
  useProjectStatQuery,
  useTopProjectsByProfitQuery,
} from '@/views/dashboard/hooks/useStatisticQueries'
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
  const { data: topProjectsByProfit } = useTopProjectsByProfitQuery(isAdminOrAccounting(user?.roles))

  const getPerformanceLabel = (active?: number, total?: number) => {
    if (!active || !total) return 'Chưa có dữ liệu'

    const percent = Math.round((active / total) * 100)

    if (active === total) return 'Xuất sắc'
    if (percent >= 70) return 'Tốt'
    if (percent >= 50) return 'Trung bình'
    return 'Cần cải thiện'
  }

  const constructedData = useMemo(() => {
    const daysInMonth = getDaysInMonth(monthlySpendingStat?.month)
    const padArray = (arr: number[] = []) => [...arr, ...Array(daysInMonth - arr.length).fill(0)]

    return {
      series: [
        {
          name: 'Doanh thu đã nhận',
          data: padArray(monthlySpendingStat?.receivedRevenue),
        },
        {
          name: 'Doanh thu đang giữ',
          data: padArray(monthlySpendingStat?.holdRevenue),
        },
        {
          name: 'Tổng chi tiêu',
          data: padArray(monthlySpendingStat?.cost),
        },
        {
          name: 'Lợi nhuận',
          data: padArray(monthlySpendingStat?.profit),
        },
      ],
      timeRange: getDaysArrayInMonth(monthlySpendingStat?.month),
    }
  }, [monthlySpendingStat])

  const totalSpentMonth = useMemo(() => {
    return monthlySpendingStat?.cost?.reduce((acc, curr) => acc + curr, 0) || 0
  }, [monthlySpendingStat])

  return (
    <>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mb-4">
        <FinanceStatsCard title="Tổng dự án" value={projectStat?.totalProjects} />
        <FinanceStatsCard title="Dự án đang hoạt động" value={projectStat?.activeProjects} />
        <FinanceStatsCard title="Công việc được giao hôm nay" value={projectStat?.totalTasksAssignedToday} />
        <FinanceStatsCard title="Công việc hoàn thành hôm nay" value={projectStat?.totalTasksCompletedToday} />
        <FinanceStatsCard title="Tổng chi tiêu hôm nay" value={formatUSD(projectStat?.totalSpentToday)} />
      </div>

      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
        {isAdminOrAccounting(user?.roles) && (
          <Card>
            <h4 className="mb-4 font-semibold">Top dự án theo lợi nhuận</h4>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {topProjectsByProfit && topProjectsByProfit.length > 0 ? (
                topProjectsByProfit.map((project, index) => (
                  <div
                    key={project.projectId}
                    className="flex justify-between items-center pb-3 border-gray-100 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex justify-center items-center rounded-full w-8 h-8 font-bold text-sm text-white ${
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                              ? 'bg-gray-400'
                              : index === 2
                                ? 'bg-orange-600'
                                : 'bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-700 text-sm">{project.projectName}</span>
                    </div>
                    <span className="font-semibold text-green-600 text-sm">{formatUSD(project.profit)}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">Chưa có dữ liệu</p>
              )}
            </div>
          </Card>
        )}

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

        <Card className="lg:col-span-1">
          <h4 className="mb-4 font-semibold">Thống kê tài chính</h4>
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-gray-600 text-sm">Tổng chi tiêu tháng {monthlySpendingStat?.month}</p>
              <h4 className="font-bold text-gray-800">
                <NumericFormat thousandSeparator displayType="text" value={totalSpentMonth} prefix="$" />
              </h4>
            </div>
            <div className="pt-4 border-gray-200 border-t">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">Doanh thu đã nhận</span>
                  <span className="font-semibold text-green-600 text-xs">
                    {formatUSD(monthlySpendingStat?.receivedRevenue?.reduce((acc, curr) => acc + curr, 0) || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">Doanh thu đang giữ</span>
                  <span className="font-semibold text-blue-600 text-xs">
                    {formatUSD(monthlySpendingStat?.holdRevenue?.reduce((acc, curr) => acc + curr, 0) || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">Lợi nhuận</span>
                  <span className="font-semibold text-yellow-600 text-xs">
                    {formatUSD(monthlySpendingStat?.profit?.reduce((acc, curr) => acc + curr, 0) || 0)}
                  </span>
                </div>
              </div>
            </div>
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
          customOptions={{ legend: { show: true } }}
        />
      </Card>
    </>
  )
}
