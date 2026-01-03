import { Loading } from '@/components/shared'
import { Card } from '@/components/ui'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManagerOrAccounting, isMember } from '@/utils/checkRole'
import DashboardHeader from '@/views/dashboard/components/DashboardHeader'
import FinanceStats from '@/views/dashboard/components/FinanceStats'
import MyTasks from '@/views/dashboard/components/MyTasks'
import Schedule from '@/views/dashboard/components/Schedule'
import Statistic from '@/views/dashboard/components/Statistic'
import TaskOverview from '@/views/dashboard/components/TaskOverview'
import { useTaskStatisticQuery, useUserStatisticQuery } from '@/views/dashboard/hooks/useStatisticQueries'
import FinanceReportTable from '@/views/finance/reports/components/FinanceReportTable'
import FinanceReportTableTools from '@/views/finance/reports/components/FinanceReportTableTools'

export default function Dashboard() {
  const { user } = useAuthStore()

  const { data: userStats, isLoading: isLoadingUserStats } = useUserStatisticQuery(
    isAdminOrManagerOrAccounting(user?.roles),
  )
  const { data: taskStats, isLoading: isLoadingTaskStats } = useTaskStatisticQuery(isMember(user?.roles))

  const renderDashboardContent = () => {
    if (isAdminOrManagerOrAccounting(user?.roles)) {
      return (
        <>
          <Statistic data={userStats} />

          <Card header="Báo cáo tiến độ hàng ngày của dự án">
            <FinanceReportTableTools />
            <FinanceReportTable showSummary />
          </Card>
          <FinanceStats />
        </>
      )
    }

    return (
      <>
        <DashboardHeader data={taskStats} />

        <div className="flex-1 gap-4 grid grid-cols-3">
          <div className="col-span-2">
            <TaskOverview data={taskStats} />
          </div>

          <div className="col-span-1">
            <Schedule />
          </div>
        </div>

        <MyTasks />
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <Loading loading={isLoadingUserStats || isLoadingTaskStats}>{renderDashboardContent()}</Loading>
    </div>
  )
}
