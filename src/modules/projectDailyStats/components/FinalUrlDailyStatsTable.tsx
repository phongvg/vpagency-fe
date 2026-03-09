import { finalUrlDailyStatsColumnConfig } from "@/modules/projectDailyStats/configs/final-url-daily-stats-column.config";
import type { FinalUrlDailyStatsListParams, FinalUrlDailyStatsResponse } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import type { VisibilityState } from "@tanstack/react-table";
import { useState } from "react";

interface FinalUrlDailyStatsTableProps {
  data: FinalUrlDailyStatsResponse | undefined;
  loading: boolean;
  params: FinalUrlDailyStatsListParams;
  setParams: React.Dispatch<React.SetStateAction<FinalUrlDailyStatsListParams>>;
}

export default function FinalUrlDailyStatsTable({ data, loading, params, setParams }: FinalUrlDailyStatsTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  return (
    <AppTable
      data={data?.data?.items || []}
      columns={finalUrlDailyStatsColumnConfig()}
      loading={loading}
      page={params.page}
      pageCount={data?.data?.meta?.totalPages}
      pageSize={params.limit}
      onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
      enableColumnVisibility
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}
