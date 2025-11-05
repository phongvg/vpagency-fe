import { Loading } from '@/components/shared'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdmin, isMember } from '@/utils/checkRole'
import DashboardHeader from '@/views/dashboard/components/DashboardHeader'
import FinanceStats from '@/views/dashboard/components/FinanceStats'
import MyTasks from '@/views/dashboard/components/MyTasks'
import ProjectDailyReports from '@/views/dashboard/components/ProjectDailyReports'
import Schedule from '@/views/dashboard/components/Schedule'
import Statistic from '@/views/dashboard/components/Statistic'
import TaskOverview from '@/views/dashboard/components/TaskOverview'
import {
  useFinanceStatsQuery,
  useTaskStatisticQuery,
  useUserStatisticQuery,
} from '@/views/dashboard/hooks/useStatisticQueries'

export default function Dashboard() {
  const { user } = useAuthStore()

  const { data: userStats, isLoading: isLoadingUserStats } = useUserStatisticQuery(isAdmin(user?.roles))
  const { data: taskStats, isLoading: isLoadingTaskStats } = useTaskStatisticQuery(isMember(user?.roles))
  const { data: financeStats, isLoading: isLoadingFinanceStats } = useFinanceStatsQuery(isAdmin(user?.roles))

  const renderDashboardContent = () => {
    if (isAdmin(user?.roles)) {
      return (
        <>
          <Statistic data={userStats} />
          <ProjectDailyReports />
          <FinanceStats data={financeStats} />
        </>
      )
    } else {
      return (
        <>
          <DashboardHeader data={taskStats} />

          <div className="flex xl:flex-row flex-col gap-4">
            <div className="flex flex-col flex-auto gap-4">
              <TaskOverview data={taskStats} />
              <MyTasks />
            </div>
            <div className="flex flex-col gap-4">
              <div className="xl:w-[380px]">
                <Schedule />
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <Loading loading={isLoadingUserStats || isLoadingTaskStats || isLoadingFinanceStats}>
        {renderDashboardContent()}
      </Loading>
    </div>
  )
}
