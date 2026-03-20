import FinalUrlDailyMetrics from "@/modules/projectDailyStats/components/FinalUrlDailyMetrics";
import { finalUrlDailySummaryColumnConfig } from "@/modules/projectDailyStats/configs/final-url-daily-summary-column.config";
import type { AggregatedMetrics } from "@/modules/projectDailyStats/types/projectDailyMetrics.type";
import type { FinalUrlDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import type { RowSelectionState, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface FinalUrlDailySummaryTableProps {
  summary: FinalUrlDailyStatsSummary[] | undefined;
  loading: boolean;
}

export default function FinalUrlDailySummaryTable({ summary, loading }: FinalUrlDailySummaryTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { user } = useAuthStore();

  const selectedProjectsData = useMemo(() => {
    return summary ? summary.filter((c) => Object.keys(rowSelection).includes(c.finalUrlId)) : [];
  }, [summary, rowSelection]);

  const aggregatedData = useMemo<AggregatedMetrics>(() => {
    if (!summary || summary.length === 0) {
      return {
        totalCost: 0,
        totalClicks: 0,
        avgCpc: 0,
        totalImpression: 0,
      };
    }

    // Nếu có dòng được chọn thì tính theo dòng được chọn, nếu không thì tính tất cả
    const summaryData = Object.keys(rowSelection).length > 0 ? selectedProjectsData : summary;

    const totalCost = summaryData.reduce((sum, item) => sum + (item.totalCost || 0), 0);
    const totalClicks = summaryData.reduce((sum, item) => sum + (item.totalClicks || 0), 0);
    const totalImpression = summaryData.reduce((sum, item) => sum + (item.totalImpression || 0), 0);

    return {
      totalCost,
      totalClicks,
      avgCpc: totalClicks > 0 ? totalCost / totalClicks : 0,
      totalImpression,
    };
  }, [summary, rowSelection]);

  if (!user) return null;

  return (
    <div className='space-y-4'>
      <FinalUrlDailyMetrics aggregatedData={aggregatedData} />

      <AppTable
        data={summary ?? []}
        columns={finalUrlDailySummaryColumnConfig()}
        loading={loading}
        page={1}
        pageCount={1}
        pageSize={summary ? summary.length : 0}
        rowIdKey='finalUrlId'
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableColumnVisibility
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        isScrollVertical
      />
    </div>
  );
}
