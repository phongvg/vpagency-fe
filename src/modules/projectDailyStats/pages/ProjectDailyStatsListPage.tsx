import EditProjectDailyReportModal from "@/modules/projectDailyStats/components/EditProjectDailyReportModal";
import ProjectDailyStatsTable from "@/modules/projectDailyStats/components/ProjectDailyStatsTable";
import ProjectDailySummaryTable from "@/modules/projectDailyStats/components/ProjectDailySummaryTable";
import { useDeleteProjectDailyReport } from "@/modules/projectDailyStats/hooks/useDeleteProjectDailyReport";
import { useProjectDailyStats } from "@/modules/projectDailyStats/hooks/useProjectDailyStats";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppButton } from "@/shared/components/common/AppButton";
import { AppLoading } from "@/shared/components/common/AppLoading";
import DatePicker from "@/shared/components/common/DatePicker/DatePicker";
import { Input } from "@/shared/components/ui/input";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { format } from "date-fns";
import { CirclePlus } from "lucide-react";
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

  const { data, isLoading } = useProjectDailyStats(params);

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

  if (!data) return null;

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-end gap-2'>
          <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Tìm kiếm theo tên dự án' className='w-[200px]' />
          <DatePicker
            value={params.fromDate ? format(new Date(params.fromDate), "yyyy-MM-dd") : undefined}
            onChange={(date) => setParams((prev) => ({ ...prev, fromDate: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
            placeholder='Từ ngày'
          />
          <DatePicker
            value={params.toDate ? format(new Date(params.toDate), "yyyy-MM-dd") : undefined}
            onChange={(date) => setParams((prev) => ({ ...prev, toDate: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
            placeholder='Đến ngày'
          />
        </div>

        <AppButton size='sm' variant='outline' onClick={() => handleOpenEditModal(null)}>
          <CirclePlus />
          Tạo báo cáo
        </AppButton>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tổng quan dự án</CardTitle>
        </CardHeader>

        <CardContent className='normal-case'>
          <ProjectDailySummaryTable projectDailySummary={data.data.summary} />
        </CardContent>
      </Card>

      <ProjectDailyStatsTable
        projectDailyStats={data}
        params={params}
        setParams={setParams}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteReport}
      />

      <EditProjectDailyReportModal open={isEditModalOpen} onClose={handleCloseEditModal} reportId={projectDailyReportId} />
    </div>
  );
}
