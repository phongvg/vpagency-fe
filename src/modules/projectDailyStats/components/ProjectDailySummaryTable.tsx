import ProjectDailyMetrics from "@/modules/projectDailyStats/components/ProjectDailyMetrics";
import { employeeSummaryColumnConfig } from "@/modules/projectDailyStats/configs/employee-summary-column.config";
import { finalUrlSummaryColumnConfig } from "@/modules/projectDailyStats/configs/final-url-summary-column.config";
import { projectDailySummaryColumnConfig } from "@/modules/projectDailyStats/configs/project-daily-summary-column.config";
import type { AggregatedMetrics } from "@/modules/projectDailyStats/types/projectDailyMetrics.type";
import type { FinalURL, ProjectDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import type { RowSelectionState, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface ProjectDailySummaryTableProps {
  summary: ProjectDailyStatsSummary[];
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
      totalHoldRevenue: summaryData.reduce((sum, item) => sum + (item.holdRevenue || 0), 0),
      totalReceivedRevenue: summaryData.reduce((sum, item) => sum + (item.receivedRevenue || 0), 0),
      totalRef,
      avgCostPerRef: totalRef > 0 ? totalCost / totalRef : 0,
      avgRateRefPerClick: totalClicks > 0 ? (totalRef / totalClicks) * 100 : 0,
      totalFtd,
      avgCostPerFtd: totalFtd > 0 ? totalCost / totalFtd : 0,
      avgRateFtdPerRef: totalRef > 0 ? (totalFtd / totalRef) * 100 : 0,
      totalTargetDailyKeyVolume: summaryData.reduce((sum, item) => sum + (item.totalTargetDailyKeyVolume || 0), 0),
      totalTargetRef: summaryData.reduce((sum, item) => sum + (item.totalTargetRef || 0), 0),
      avgClickAchievementRate: summaryData.reduce((sum, item) => sum + (item.clickAchievementRate || 0), 0) / count,
      avgRefAchievementRate: summaryData.reduce((sum, item) => sum + (item.refAchievementRate || 0), 0) / count,
    };
  }, [summary, rowSelection]);

  if (!user) return null;

  const employeeColumns = employeeSummaryColumnConfig();
  const finalUrlColumns = finalUrlSummaryColumnConfig();

  return (
    <div className='space-y-4'>
      <ProjectDailyMetrics aggregatedData={aggregatedData} />

      <AppTable
        data={summary}
        columns={projectDailySummaryColumnConfig(user?.roles)}
        loading={loading}
        page={1}
        pageCount={1}
        pageSize={summary.length}
        rowIdKey='projectId'
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableColumnVisibility
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        renderExpandedRow={(project: ProjectDailyStatsSummary) => (
          <div className='bg-white/5 py-2 pl-8'>
            {!project.finalUrls?.length ? (
              <p className='py-3 text-sm text-left italic'>Chỉ số Final URL trống</p>
            ) : (
              <AppTable
                data={project.finalUrls}
                columns={finalUrlColumns}
                page={1}
                pageCount={1}
                pageSize={project.finalUrls.length}
                rowIdKey='finalUrlId'
                renderExpandedRow={(finalUrl: FinalURL) => (
                  <div className='bg-white/5 py-2 pl-8'>
                    {!finalUrl.employees?.length ? (
                      <p className='py-3 text-sm text-left italic'>Chỉ số nhân viên trống</p>
                    ) : (
                      <AppTable
                        data={finalUrl.employees}
                        columns={employeeColumns}
                        page={1}
                        pageCount={1}
                        pageSize={finalUrl.employees.length}
                        rowIdKey='userId'
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
