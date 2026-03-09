import FinalUrlRankingsCard from "@/modules/dashboard/components/FinalUrlRankingsCard";
import FinancialStatsCard from "@/modules/dashboard/components/FinancialStatsCard";
import MonthlySpendingChart from "@/modules/dashboard/components/MonthlySpendingChart";
import ProjectRankingsCard from "@/modules/dashboard/components/ProjectRankingsCard";
import ProjectStatsCard from "@/modules/dashboard/components/ProjectStatsCard";
import TaskStats from "@/modules/dashboard/components/TaskStats";
import UserStatsCard from "@/modules/dashboard/components/UserStatsCard";
import { ProjectDailyStatsListPage } from "@/modules/projectDailyStats";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { isAdminOrAccounting, isAdminOrManagerOrAccounting } from "@/shared/utils/permission.util";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (isAdminOrManagerOrAccounting(user?.roles)) {
    return (
      <div className='space-y-4'>
        <div className='gap-4 grid grid-cols-3'>
          <UserStatsCard />
          <ProjectStatsCard />
          <FinancialStatsCard />
        </div>

        <div className='slide-in-from-bottom-4 animate-in duration-700 fade-in-50'>
          <ProjectDailyStatsListPage />
        </div>

        <div className='slide-in-from-bottom-4 gap-4 grid animate-in duration-1000 fade-in-50'>
          {isAdminOrAccounting(user?.roles) && (
            <div className='gap-4 grid grid-cols-2 min-h-[300px]'>
              <ProjectRankingsCard />
              <FinalUrlRankingsCard />
            </div>
          )}

          <MonthlySpendingChart />
        </div>
      </div>
    );
  }

  return <TaskStats />;
}
