import FinancialStatsCard from "@/modules/dashboard/components/FinancialStatsCard";
import ProjectStatsCard from "@/modules/dashboard/components/ProjectStatsCard";
import UserStatsCard from "@/modules/dashboard/components/UserStatsCard";

export default function DashboardPage() {
  return (
    <div className='grid grid-cols-3'>
      <UserStatsCard />
      <ProjectStatsCard />
      <FinancialStatsCard />
    </div>
  );
}
