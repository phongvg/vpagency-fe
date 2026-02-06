import ProjectDailyStatsTable from "@/modules/projectDailyStats/components/ProjectDailyStatsTable";
import ProjectDailySummaryTable from "@/modules/projectDailyStats/components/ProjectDailySummaryTable";
import { useProjectDailyStats } from "@/modules/projectDailyStats/hooks/useProjectDailyStats";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { useState } from "react";

export default function ProjectDailyStatsListPage() {
  const [params, setParams] = useState<ProjectDailyStatsListParams>({
    page: 1,
    limit: 10,
    fromDate: undefined,
    toDate: undefined,
    projectName: undefined,
  });

  const { data, isLoading } = useProjectDailyStats(params);

  if (!data) return null;

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <div className='flex flex-col gap-4 h-full'>
      <div className='flex-1 h-0'>
        <ProjectDailySummaryTable projectDailySummary={data.data.summary} />
        <ProjectDailyStatsTable projectDailyStats={data} params={params} setParams={setParams} />
      </div>
    </div>
  );
}
