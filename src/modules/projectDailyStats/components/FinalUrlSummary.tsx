import FinalUrlDailyStatsFilter from "@/modules/projectDailyStats/components/FinalUrlDailyStatsFilter";
import FinalUrlDailySummaryTable from "@/modules/projectDailyStats/components/FinalUrlDailySummaryTable";
import { useFinalUrlStatsSummary } from "@/modules/projectDailyStats/hooks/useFinalUrlDailyStatsSummary";
import type { FinalUrlDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { formatDate, getMonth, startOfMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export default function FinalUrlSummary() {
  const [params, setParams] = useState<FinalUrlDailyStatsListParams>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    fromDate: formatDate(startOfMonth(new Date()), "yyyy-MM-dd"),
    toDate: formatDate(new Date(), "yyyy-MM-dd"),
    projectName: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [rangePickerValue, setRangePickerValue] = useState<string | null>(null);

  const debounceSearch = useDebounce(searchInput, 500);

  const month = useMemo(() => getMonth(new Date()) + 1, []);

  const { data: finalUrlDailyStats, isLoading } = useFinalUrlStatsSummary(params);

  useEffect(() => {
    setParams((prev) => ({ ...prev, projectName: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  return (
    <div className='space-y-4'>
      <FinalUrlDailyStatsFilter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        rangePickerValue={rangePickerValue}
        setRangePickerValue={setRangePickerValue}
        params={params}
        setParams={setParams}
      />

      <Card>
        <CardHeader>
          <CardTitle>Tổng quan URL - Tháng {month}</CardTitle>
        </CardHeader>

        <CardContent className='normal-case'>
          <FinalUrlDailySummaryTable summary={finalUrlDailyStats ?? []} loading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
