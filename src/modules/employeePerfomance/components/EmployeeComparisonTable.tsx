import { employeeComparisonColumnConfig } from "@/modules/dashboard/configs/employee-comparison-column.config";
import type { EmployeePerformance, EmployeePerformanceParams } from "@/modules/employeePerfomance/types/employeePerformance.type";
import { AppTable } from "@/shared/components/common/AppTable";
import type { Meta } from "@/shared/types/common/apiResponse.type";
import type { VisibilityState } from "@tanstack/react-table";
import { useState } from "react";

interface EmployeeComparisonTableProps {
  data: EmployeePerformance[] | undefined;
  meta: Meta | undefined;
  loading: boolean;
  params: EmployeePerformanceParams;
  setParams: React.Dispatch<React.SetStateAction<EmployeePerformanceParams>>;
}

export default function EmployeeComparisonTable({ data, meta, loading, params, setParams }: EmployeeComparisonTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  return (
    <AppTable
      columns={employeeComparisonColumnConfig()}
      data={data ?? []}
      loading={loading}
      page={params.page}
      pageCount={meta?.totalPages}
      pageSize={meta?.limit}
      onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
      enableColumnVisibility
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
      rowIdKey='userId'
    />
  );
}
