import EditProjectDailyReportModal from "@/modules/projectDailyStats/components/EditProjectDailyReportModal";
import ProjectDailyStatsFilter from "@/modules/projectDailyStats/components/ProjectDailyStatsFilter";
import ProjectDailyStatsTable from "@/modules/projectDailyStats/components/ProjectDailyStatsTable";
import { useDeleteProjectDailyReport } from "@/modules/projectDailyStats/hooks/useDeleteProjectDailyReport";
import { useProjectDailyStatsCompleted, useProjectDailyStatsPending } from "@/modules/projectDailyStats/hooks/useProjectDailyStats";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { formatDate, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";

const TABS = [
  { value: "pending", label: "Chờ xử lý" },
  { value: "completed", label: "Hoàn thành" },
];

export default function ProjectDailyStatsByStatus() {
  const { confirm } = useConfirm();

  const [params, setParams] = useState<ProjectDailyStatsListParams>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    fromDate: formatDate(startOfMonth(new Date()), "yyyy-MM-dd"),
    toDate: formatDate(new Date(), "yyyy-MM-dd"),
    projectName: undefined,
    typeId: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [rangePickerValue, setRangePickerValue] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projectDailyReportId, setProjectDailyReportId] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<string>(TABS[0].value);

  const debounceSearch = useDebounce(searchInput, 500);

  const { data: pendingData, refetch: refetchPending } = useProjectDailyStatsPending(params, tabValue === TABS[0].value);
  const { data: completedData, refetch: refetchCompleted } = useProjectDailyStatsCompleted(params, tabValue === TABS[1].value);
  const deleteReport = useDeleteProjectDailyReport();

  const handleTabChange = (value: string) => {
    setTabValue(value);
    if (value === TABS[0].value) refetchPending();
    else if (value === TABS[1].value) refetchCompleted();
  };

  useEffect(() => {
    setParams((prev) => ({ ...prev, projectName: debounceSearch, page: 1 }));
  }, [debounceSearch]);

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
        rangePickerValue={rangePickerValue}
        setRangePickerValue={setRangePickerValue}
        params={params}
        setParams={setParams}
        onOpenModal={() => handleOpenEditModal(null)}
      />

      <Tabs value={tabValue} onValueChange={handleTabChange}>
        <TabsList className='bg-card/50 backdrop-blur-sm rounded-lg'>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className='data-[state=active]:shadow-lg transition-all duration-300'>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={TABS[0].value}>
          <ProjectDailyStatsTable
            data={pendingData?.items || []}
            loading={false}
            params={params}
            setParams={setParams}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteReport}
            meta={pendingData?.meta}
          />
        </TabsContent>

        <TabsContent value={TABS[1].value}>
          <ProjectDailyStatsTable
            data={completedData?.items || []}
            loading={false}
            params={params}
            setParams={setParams}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteReport}
            meta={completedData?.meta}
          />
        </TabsContent>
      </Tabs>

      <EditProjectDailyReportModal open={isEditModalOpen} onClose={handleCloseEditModal} reportId={projectDailyReportId} />
    </div>
  );
}
