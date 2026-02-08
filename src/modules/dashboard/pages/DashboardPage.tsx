import FinancialStatsCard from "@/modules/dashboard/components/FinancialStatsCard";
import ProjectRankingsCard from "@/modules/dashboard/components/ProjectRankingsCard";
import ProjectStatsCard from "@/modules/dashboard/components/ProjectStatsCard";
import UserStatsCard from "@/modules/dashboard/components/UserStatsCard";
import { ProjectDailyStatsListPage } from "@/modules/projectDailyStats";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { isAdminOrManagerOrAccounting } from "@/shared/utils/permission.util";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className='space-y-4'>
      <div className='gap-1 grid grid-cols-4'>
        <UserStatsCard />
        <ProjectStatsCard />
        <FinancialStatsCard />
        <ProjectRankingsCard />
      </div>

      {isAdminOrManagerOrAccounting(user?.roles) && <ProjectDailyStatsListPage />}
    </div>
  );
}
