import ProjectDailyStatsByStatus from "@/modules/projectDailyStats/components/ProjectDailyStatsByStatus";
import ProjectDailySummary from "@/modules/projectDailyStats/components/ProjectDailySummary";

export default function ProjectDailyStatsTab() {
  return (
    <div className='space-y-4'>
      <ProjectDailySummary />
      <ProjectDailyStatsByStatus />
    </div>
  );
}
