import ProjectDailyMetrics from "@/modules/projectDailyStats/components/ProjectDailyMetrics";
import { projectDailySummaryColumnConfig } from "@/modules/projectDailyStats/configs/project-daily-summary-column.config";
import type { AggregatedMetrics } from "@/modules/projectDailyStats/types/projectDailyMetrics.type";
import type { ProjectDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import type { RowSelectionState, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface ProjectDailySummaryTableProps {
  summary: ProjectDailyStatsSummary[] | undefined;
  loading: boolean;
}

export default function ProjectDailySummaryTable({ summary, loading }: ProjectDailySummaryTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { user } = useAuthStore();

  const selectedProjectsData = useMemo(() => {
    return summary ? summary.filter((c) => Object.keys(rowSelection).includes(c.projectId)) : [];
  }, [summary, rowSelection]);

  const aggregatedData = useMemo<AggregatedMetrics>(() => {
    if (!summary || summary.length === 0) {
      return {
        totalCost: 0,
        totalClicks: 0,
        avgCpc: 0,
        totalProfit: 0,
        avgRoi: 0,
        totalHoldRevenue: 0,
        totalReceivedRevenue: 0,
        totalRef: 0,
        avgCostPerRef: 0,
        avgRateRefPerClick: 0,
        totalFtd: 0,
        avgCostPerFtd: 0,
        avgRateFtdPerRef: 0,
        totalTargetDailyKeyVolume: 0,
        totalTargetRef: 0,
        avgClickAchievementRate: 0,
        avgRefAchievementRate: 0,
      };
    }

    // Nếu có dòng được chọn thì tính theo dòng được chọn, nếu không thì tính tất cả
    const summaryData = Object.keys(rowSelection).length > 0 ? selectedProjectsData : summary;

    const count = summaryData.length;
    const totalCost = summaryData.reduce((sum, item) => sum + (item.totalCost || 0), 0);
    const totalClicks = summaryData.reduce((sum, item) => sum + (item.totalClicks || 0), 0);
    const totalProfit = summaryData.reduce((sum, item) => sum + (item.profit || 0), 0);
    const totalRef = summaryData.reduce((sum, item) => sum + (item.totalRef || 0), 0);
    const totalFtd = summaryData.reduce((sum, item) => sum + (item.totalFtd || 0), 0);

    return {
      totalCost,
      totalClicks,
      avgCpc: totalClicks > 0 ? totalCost / totalClicks : 0,
      totalProfit,
      avgRoi: totalCost > 0 ? (totalProfit / totalCost) * 100 : 0,
      totalHoldRevenue: summary.reduce((sum, item) => sum + (item.holdRevenue || 0), 0),
      totalReceivedRevenue: summary.reduce((sum, item) => sum + (item.receivedRevenue || 0), 0),
      totalRef,
      avgCostPerRef: totalRef > 0 ? totalCost / totalRef : 0,
      avgRateRefPerClick: totalClicks > 0 ? (totalRef / totalClicks) * 100 : 0,
      totalFtd,
      avgCostPerFtd: totalFtd > 0 ? totalCost / totalFtd : 0,
      avgRateFtdPerRef: totalRef > 0 ? (totalFtd / totalRef) * 100 : 0,
      totalTargetDailyKeyVolume: summary.reduce((sum, item) => sum + (item.totalTargetDailyKeyVolume || 0), 0),
      totalTargetRef: summary.reduce((sum, item) => sum + (item.totalTargetRef || 0), 0),
      avgClickAchievementRate: summary.reduce((sum, item) => sum + (item.clickAchievementRate || 0), 0) / count,
      avgRefAchievementRate: summary.reduce((sum, item) => sum + (item.refAchievementRate || 0), 0) / count,
    };
  }, [summary, rowSelection]);

  if (!user) return null;

  return (
    <div className='space-y-4'>
      <ProjectDailyMetrics aggregatedData={aggregatedData} />

      <AppTable
        data={summary ?? []}
        columns={projectDailySummaryColumnConfig(user?.roles)}
        loading={loading}
        page={1}
        pageCount={1}
        pageSize={summary ? summary.length : 0}
        rowIdKey='projectId'
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
