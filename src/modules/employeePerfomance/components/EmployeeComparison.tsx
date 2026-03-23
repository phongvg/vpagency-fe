import EmployeeComparisonTable from "@/modules/employeePerfomance/components/EmployeeComparisonTable";
import { useEmployeePerformance } from "@/modules/employeePerfomance/hooks/useEmployeePerfomance";
import type { EmployeePerformanceParams } from "@/modules/employeePerfomance/types/employeePerformance.type";
import { projectTypeApi } from "@/modules/projectType/api/projectType.api";
import type { ProjectType } from "@/modules/projectType/types/projectType.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import AsyncSelect from "@/shared/components/common/AsyncSelect";
import DatePicker from "@/shared/components/common/DatePicker";
import SearchInput from "@/shared/components/SearchInput";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { createAsyncSelectFetcher } from "@/shared/utils/async-select.util";
import { format, formatDate, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";

export default function EmployeeComparison() {
  const [params, setParams] = useState<EmployeePerformanceParams>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    dateFrom: formatDate(startOfMonth(new Date()), "yyyy-MM-dd"),
    dateTo: formatDate(new Date(), "yyyy-MM-dd"),
    projectTypeId: undefined,
    search: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

  const debounceSearch = useDebounce(searchInput, 500);

  const { data: employeePerformanceData } = useEmployeePerformance(params);

  const fetchProjectTypes = createAsyncSelectFetcher(projectTypeApi.getProjectTypes);

  useEffect(() => {
    setParams((prev) => ({ ...prev, search: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng quan hiệu suất nhân viên</CardTitle>
      </CardHeader>

      <CardContent className='normal-case'>
        <div className='space-y-4'>
          <div className='flex items-end gap-2'>
            <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} placeholder='Tìm kiếm theo tên dự án' />
            <DatePicker
              value={params.dateFrom}
              onChange={(date) => setParams((prev) => ({ ...prev, dateFrom: date ? format(date, "yyyy-MM-dd") : undefined }))}
              placeholder='Từ ngày'
            />
            <DatePicker
              value={params.dateTo}
              onChange={(date) => setParams((prev) => ({ ...prev, dateTo: date ? format(date, "yyyy-MM-dd") : undefined }))}
              placeholder='Đến ngày'
            />
            <AsyncSelect<ProjectType>
              fetcher={fetchProjectTypes}
              mapOption={(type) => ({ value: type.id, label: type.name })}
              onChange={(value) =>
                setParams((prev) => ({ ...prev, projectTypeId: value && !Array.isArray(value) ? String(value.value) : undefined, page: 1 }))
              }
              placeholder='Loại dự án'
            />
          </div>

          <EmployeeComparisonTable
            data={employeePerformanceData?.items || []}
            meta={employeePerformanceData?.meta}
            loading={!employeePerformanceData}
            params={params}
            setParams={setParams}
          />
        </div>
      </CardContent>
    </Card>
  );
}
