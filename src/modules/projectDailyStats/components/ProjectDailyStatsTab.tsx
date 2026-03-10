import EditProjectDailyReportModal from "@/modules/projectDailyStats/components/EditProjectDailyReportModal";
import ProjectDailyStatsFilter from "@/modules/projectDailyStats/components/ProjectDailyStatsFilter";
import ProjectDailyStatsTable from "@/modules/projectDailyStats/components/ProjectDailyStatsTable";
import ProjectDailySummaryTable from "@/modules/projectDailyStats/components/ProjectDailySummaryTable";
import { useDeleteProjectDailyReport } from "@/modules/projectDailyStats/hooks/useDeleteProjectDailyReport";
import { useProjectDailyStats } from "@/modules/projectDailyStats/hooks/useProjectDailyStats";
import type { ProjectDailyStatsListParams, ProjectDailyStatsResponse } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { formatDate, getMonth, startOfMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";

const STATUS_TABS = [
  { value: "completed", label: "Hoàn thành", status: "COMPLETED" },
  { value: "pending", label: "Chờ xử lý", status: "PENDING" },
] as const;

export default function ProjectDailyStatsTab() {
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
  const [statusTab, setStatusTab] = useState<string>(STATUS_TABS[0].value);

  const debounceSearch = useDebounce(searchInput, 500);

  const month = useMemo(() => getMonth(new Date()) + 1, []);

  const { data: projectDailyStats, isLoading } = useProjectDailyStats(params);
  const deleteReport = useDeleteProjectDailyReport();

  const filteredDataByStatus = useMemo(() => {
    const currentStatusTab = STATUS_TABS.find((tab) => tab.value === statusTab);
    if (!projectDailyStats?.data?.items || !currentStatusTab) return projectDailyStats;

    const filteredItems = projectDailyStats.data.items.filter((item) => item.status === currentStatusTab.status);

    return {
      ...projectDailyStats,
      data: {
        ...projectDailyStats.data,
        items: filteredItems,
      },
    } as ProjectDailyStatsResponse;
  }, [projectDailyStats, statusTab]);

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

      <Card>
        <CardHeader>
          <CardTitle>Tổng quan dự án - Tháng {month}</CardTitle>
        </CardHeader>

        <CardContent className='normal-case'>
          <ProjectDailySummaryTable summary={projectDailyStats?.data?.summary} loading={isLoading} />
        </CardContent>
      </Card>

      <Tabs value={statusTab} onValueChange={setStatusTab}>
        <TabsList>
          {STATUS_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {STATUS_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <ProjectDailyStatsTable
              projectDailyStats={filteredDataByStatus}
              params={params}
              loading={isLoading}
              setParams={setParams}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteReport}
              disableActions={tab.status === "PENDING"}
            />
          </TabsContent>
        ))}
      </Tabs>

      <EditProjectDailyReportModal open={isEditModalOpen} onClose={handleCloseEditModal} reportId={projectDailyReportId} />
    </div>
  );
}
