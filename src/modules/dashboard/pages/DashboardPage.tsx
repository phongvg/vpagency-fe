import FinancialStatsCard from "@/modules/dashboard/components/FinancialStatsCard";
import MonthlySpendingChart from "@/modules/dashboard/components/MonthlySpendingChart";
import ProjectRankingsCard from "@/modules/dashboard/components/ProjectRankingsCard";
import ProjectStatsCard from "@/modules/dashboard/components/ProjectStatsCard";
import TaskStats from "@/modules/dashboard/components/TaskStats";
import UserStatsCard from "@/modules/dashboard/components/UserStatsCard";
import { ProjectDailyStatsListPage } from "@/modules/projectDailyStats";
import { cn } from "@/shared/libs/utils";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { isAdminOrAccounting, isAdminOrManagerOrAccounting } from "@/shared/utils/permission.util";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (isAdminOrManagerOrAccounting(user?.roles)) {
    return (
      <div className='space-y-4'>
        <div className='gap-1 grid grid-cols-3'>
          <UserStatsCard />
          <ProjectStatsCard />
          <FinancialStatsCard />
        </div>

        <ProjectDailyStatsListPage />

        <div className={cn("gap-4 grid", isAdminOrAccounting(user?.roles) ? "grid-cols-4" : "grid-cols-1")}>
          {isAdminOrAccounting(user?.roles) && (
            <div className='col-span-1'>
              <ProjectRankingsCard />
            </div>
          )}

          <div className={isAdminOrAccounting(user?.roles) ? "col-span-3" : "col-span-1"}>
            <MonthlySpendingChart />
          </div>
        </div>
      </div>
    );
  }

  return <TaskStats />;
}
