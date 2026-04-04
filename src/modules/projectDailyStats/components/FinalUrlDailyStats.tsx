import FinalUrlDailyStatsFilter from "@/modules/projectDailyStats/components/FinalUrlDailyStatsFilter";
import { employeeCampaignColumnConfig } from "@/modules/projectDailyStats/configs/employee-campaign-column.config";
import { employeeSummaryColumnConfig } from "@/modules/projectDailyStats/configs/employee-summary-column.config";
import { finalUrlDailySummaryColumnConfig } from "@/modules/projectDailyStats/configs/final-url-daily-summary-column.config";
import { useFinalUrlDailyStats } from "@/modules/projectDailyStats/hooks/useFinalUrlDailyStats";
import type { Employee, FinalUrlDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { VisibilityState } from "@tanstack/react-table";
import { formatDate, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";

export default function FinalUrlDailyStats() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
  const employeeColumns = employeeSummaryColumnConfig();

  useEffect(() => {
    setParams((prev) => ({ ...prev, projectName: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  const { data: finalUrlDailyStats, isLoading } = useFinalUrlDailyStats(params);

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

      <AppTable
        data={finalUrlDailyStats?.items ?? []}
        columns={finalUrlDailySummaryColumnConfig()}
        loading={isLoading}
        page={params.page}
        pageCount={finalUrlDailyStats?.meta.totalPages ?? 0}
        pageSize={params.limit}
        onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
        rowIdKey='finalUrlId'
        enableColumnVisibility
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        renderExpandedRow={(row) => (
          <div className='bg-white/5 py-2 pl-8'>
            {!row.employees?.length ? (
              <p className='py-3 text-sm text-left italic'>Chỉ số nhân viên trống</p>
            ) : (
              <AppTable
                data={row.employees}
                columns={employeeColumns}
                page={1}
                pageCount={1}
                pageSize={row.employees.length}
                rowIdKey='userId'
                renderExpandedRow={(employee: Employee) => (
                  <div className='bg-white/5 py-2 pl-8'>
                    {!employee.campaigns?.length ? (
                      <p className='py-3 text-sm text-left italic'>Chỉ số chiến dịch trống</p>
                    ) : (
                      <AppTable
                        data={employee.campaigns}
                        columns={employeeCampaignColumnConfig()}
                        page={1}
                        pageCount={1}
                        pageSize={employee.campaigns.length}
                        rowIdKey='campaignId'
                      />
                    )}
                  </div>
                )}
              />
            )}
          </div>
        )}
      />
    </div>
  );
}
