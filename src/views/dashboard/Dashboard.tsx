import { Loading } from '@/components/shared'
import DashboardHeader from '@/views/dashboard/components/DashboardHeader'
import Schedule from '@/views/dashboard/components/Schedule'
import Statistic from '@/views/dashboard/components/Statistic'
import TaskOverview from '@/views/dashboard/components/TaskOverview'
import { useTaskStatisticQuery, useUserStatisticQuery } from '@/views/dashboard/hooks/useStatisticQueries'

export default function Dashboard() {
  // const { data: userStatisticResponse, isLoading } = useUserStatisticQuery()
  const { data: taskStats } = useTaskStatisticQuery()

  return (
    <div className="flex flex-col gap-4 h-full">
      <Loading loading={false}>
        <DashboardHeader data={taskStats} />

        <div className="flex xl:flex-row flex-col gap-4">
          <div className="flex flex-col flex-auto gap-4">
            <TaskOverview data={taskStats} />
            {/* <MyTasks data={dashboardData?.myTasksData} />
            <Projects data={dashboardData?.projectsData} /> */}
          </div>
          <div className="flex flex-col gap-4">
            <div className="xl:w-[380px]">
              <Schedule />
            </div>
          </div>
        </div>

        {/* <Statistic data={userStatisticResponse} /> */}
      </Loading>
    </div>
  )
}
