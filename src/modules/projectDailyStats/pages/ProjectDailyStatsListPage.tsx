import EditProjectDailyReportModal from "@/modules/projectDailyStats/components/EditProjectDailyReportModal";
import ProjectDailyStatsFilter from "@/modules/projectDailyStats/components/ProjectDailyStatsFilter";
import ProjectDailyStatsTable from "@/modules/projectDailyStats/components/ProjectDailyStatsTable";
import ProjectDailySummaryTable from "@/modules/projectDailyStats/components/ProjectDailySummaryTable";
import { useDeleteProjectDailyReport } from "@/modules/projectDailyStats/hooks/useDeleteProjectDailyReport";
import { useProjectDailyStats } from "@/modules/projectDailyStats/hooks/useProjectDailyStats";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";

export default function ProjectDailyStatsListPage() {
  const [params, setParams] = useState<ProjectDailyStatsListParams>({
    page: 1,
    limit: 10,
    fromDate: undefined,
    toDate: undefined,
    projectName: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projectDailyReportId, setProjectDailyReportId] = useState<string | null>(null);

  const debounceSearch = useDebounce(searchInput, 500);

  const { confirm } = useConfirm();

  const deleteReport = useDeleteProjectDailyReport();

  useEffect(() => {
    setParams((prev) => ({ ...prev, projectName: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  const { data: projectDailyStats, isLoading } = useProjectDailyStats(params);

  const handleOpenEditModal = (reportId: string | null) => {
    setProjectDailyReportId(reportId ?? null);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setProjectDailyReportId(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteReport = async (reportId: string) => {
    const isConfirmed = await confirm({
      description: "Bạn có chắc chắn muốn xoá báo cáo hàng ngày này không? Hành động này không thể hoàn tác.",
    });

    if (isConfirmed) {
      await deleteReport.mutateAsync(reportId);
    }
  };

  return (
    <div className='space-y-4'>
      <ProjectDailyStatsFilter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        params={params}
        setParams={setParams}
        onOpenModal={() => handleOpenEditModal(null)}
      />

      <Card>
        <CardHeader>
          <CardTitle>Tổng quan dự án</CardTitle>
        </CardHeader>

        <CardContent className='normal-case'>
          <ProjectDailySummaryTable projectDailySummary={projectDailyStats?.data?.summary} loading={isLoading} />
        </CardContent>
      </Card>

      <ProjectDailyStatsTable
        projectDailyStats={projectDailyStats}
        params={params}
        loading={isLoading}
        setParams={setParams}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteReport}
      />

      <EditProjectDailyReportModal open={isEditModalOpen} onClose={handleCloseEditModal} reportId={projectDailyReportId} />
    </div>
  );
}
