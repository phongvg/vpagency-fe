import ProjectDailyStatsFilter from "@/modules/projectDailyStats/components/ProjectDailyStatsFilter";
import ProjectDailySummaryTable from "@/modules/projectDailyStats/components/ProjectDailySummaryTable";
import { useProjectDailyStatsSummary } from "@/modules/projectDailyStats/hooks/useProjectDailyStatsSummary";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { formatDate, getMonth, startOfMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export default function ProjectDailySummary() {
  const [params, setParams] = useState<ProjectDailyStatsListParams>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    fromDate: formatDate(startOfMonth(new Date()), "yyyy-MM-dd"),
    toDate: formatDate(new Date(), "yyyy-MM-dd"),
    projectName: undefined,
    typeId: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [rangePickerValue, setRangePickerValue] = useState<string | null>(null);

  const month = useMemo(() => getMonth(new Date()) + 1, []);

  const debounceSearch = useDebounce(searchInput, 500);

  const { data: projectDailyStatsSummary, isLoading } = useProjectDailyStatsSummary(params);

  useEffect(() => {
    setParams((prev) => ({ ...prev, projectName: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  return (
    <div className='space-y-4'>
      <ProjectDailyStatsFilter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        rangePickerValue={rangePickerValue}
        setRangePickerValue={setRangePickerValue}
        params={params}
        setParams={setParams}
      />

      <Card>
        <CardHeader>
          <CardTitle>Tổng quan dự án - Tháng {month}</CardTitle>
        </CardHeader>

        <CardContent className='normal-case'>
          <ProjectDailySummaryTable summary={projectDailyStatsSummary ?? []} loading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
