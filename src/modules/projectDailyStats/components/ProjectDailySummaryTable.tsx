import ProjectDailyMetrics from "@/modules/projectDailyStats/components/ProjectDailyMetrics";
import { projectDailySummaryColumnConfig } from "@/modules/projectDailyStats/configs/project-daily-summary-column.config";
import type { AggregatedMetrics } from "@/modules/projectDailyStats/types/projectDailyMetrics.type";
import type { ProjectDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import type { RowSelectionState, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface ProjectDailySummaryTableProps {
  projectDailySummary: ProjectDailyStatsSummary[] | undefined;
  loading: boolean;
}

const PAGE_SIZE = 10;

export default function ProjectDailySummaryTable({ projectDailySummary, loading }: ProjectDailySummaryTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { user } = useAuthStore();

  const selectedProjectsData = useMemo(() => {
    return projectDailySummary ? projectDailySummary.filter((c) => Object.keys(rowSelection).includes(c.finalUrlId)) : [];
  }, [projectDailySummary, rowSelection]);

  const aggregatedData = useMemo<AggregatedMetrics>(() => {
    if (!projectDailySummary || projectDailySummary.length === 0) {
      return {
        totalCost: 0,
        totalClicks: 0,
        avgCpc: 0,
        totalImpression: 0,
      };
    }

    // Nếu có dòng được chọn thì tính theo dòng được chọn, nếu không thì tính tất cả
    const summary = Object.keys(rowSelection).length > 0 ? selectedProjectsData : projectDailySummary;

    // const count = summary.length;
    const totalCost = summary.reduce((sum, item) => sum + (item.totalCost || 0), 0);
    const totalClicks = summary.reduce((sum, item) => sum + (item.totalClicks || 0), 0);
    const totalImpression = summary.reduce((sum, item) => sum + (item.totalImpression || 0), 0);

    return {
      totalCost,
      totalClicks,
      avgCpc: totalClicks > 0 ? totalCost / totalClicks : 0,
      totalImpression,
    };
  }, [projectDailySummary, rowSelection]);

  if (!user) return null;

  return (
    <div className='space-y-4'>
      <ProjectDailyMetrics aggregatedData={aggregatedData} />

      <AppTable
        data={projectDailySummary ?? []}
        columns={projectDailySummaryColumnConfig(user?.roles)}
        loading={loading}
        page={1}
        pageCount={1}
        pageSize={PAGE_SIZE}
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
