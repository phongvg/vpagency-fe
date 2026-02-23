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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const { user } = useAuthStore();

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return projectDailySummary ? projectDailySummary.slice(start, end) : [];
  }, [projectDailySummary, page, pageSize]);

  const pageCount = projectDailySummary ? Math.ceil(projectDailySummary.length / pageSize) : 0;

  const selectedProjectsData = useMemo(() => {
    return projectDailySummary ? projectDailySummary.filter((c) => Object.keys(rowSelection).includes(c.projectId)) : [];
  }, [projectDailySummary, rowSelection]);

  const aggregatedData = useMemo<AggregatedMetrics>(() => {
    if (!projectDailySummary || projectDailySummary.length === 0) {
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
    const summary = Object.keys(rowSelection).length > 0 ? selectedProjectsData : projectDailySummary;

    const count = summary.length;
    const totalCost = summary.reduce((sum, item) => sum + (item.totalCost || 0), 0);
    const totalClicks = summary.reduce((sum, item) => sum + (item.totalClicks || 0), 0);
    const totalProfit = summary.reduce((sum, item) => sum + (item.profit || 0), 0);
    const totalRef = summary.reduce((sum, item) => sum + (item.totalRef || 0), 0);
    const totalFtd = summary.reduce((sum, item) => sum + (item.totalFtd || 0), 0);

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
  }, [projectDailySummary, rowSelection]);

  if (!user) return null;

  return (
    <div className='space-y-4'>
      <ProjectDailyMetrics aggregatedData={aggregatedData} />

      <AppTable
        data={paginatedData}
        columns={projectDailySummaryColumnConfig(user?.roles)}
        loading={loading}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        rowIdKey='projectId'
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableColumnVisibility
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </div>
  );
}
