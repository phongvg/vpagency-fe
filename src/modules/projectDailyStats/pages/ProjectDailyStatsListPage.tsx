import ProjectDailyStatsTable from "@/modules/projectDailyStats/components/ProjectDailyStatsTable";
import ProjectDailySummaryTable from "@/modules/projectDailyStats/components/ProjectDailySummaryTable";
import { useProjectDailyStats } from "@/modules/projectDailyStats/hooks/useProjectDailyStats";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
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
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Tổng quan dự án</CardTitle>
        </CardHeader>

        <CardContent>
          <ProjectDailySummaryTable projectDailySummary={data.data.summary} />
        </CardContent>
      </Card>

      <ProjectDailyStatsTable projectDailyStats={data} params={params} setParams={setParams} />
    </div>
  );
}
