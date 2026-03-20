import { useTopFinalUrlsByCost } from "@/modules/dashboard/hooks/useTopFinalUrlsByCost";
import EditProjectDailyReportModal from "@/modules/projectDailyStats/components/EditProjectDailyReportModal";
import ProjectDailyStatsFilter from "@/modules/projectDailyStats/components/ProjectDailyStatsFilter";
import ProjectDailyStatsTable from "@/modules/projectDailyStats/components/ProjectDailyStatsTable";
import ProjectDailySummaryTable from "@/modules/projectDailyStats/components/ProjectDailySummaryTable";
import TopFinalUrlTable from "@/modules/projectDailyStats/components/TopFinalUrlTable";
import { useDeleteProjectDailyReport } from "@/modules/projectDailyStats/hooks/useDeleteProjectDailyReport";
import { useProjectDailyStats } from "@/modules/projectDailyStats/hooks/useProjectDailyStats";
import type { ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/pageSize.constant";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { formatDate, getMonth, startOfMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";

const TABS = [
  { value: "project", label: "Tổng quan dự án" },
  { value: "final-url", label: "Tổng quan URL" },
];

export default function ProjectDailyStatsListPage() {
  const [tabValue, setTabValue] = useState<string>(TABS[0].value);
  const [params, setParams] = useState<ProjectDailyStatsListParams>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    fromDate: formatDate(startOfMonth(new Date()), "yyyy-MM-dd"),
    toDate: formatDate(new Date(), "yyyy-MM-dd"),
    projectName: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [rangePickerValue, setRangePickerValue] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projectDailyReportId, setProjectDailyReportId] = useState<string | null>(null);

  const month = useMemo(() => getMonth(new Date()) + 1, []);

  const debounceSearch = useDebounce(searchInput, 500);

  const { confirm } = useConfirm();

  const deleteReport = useDeleteProjectDailyReport();

  useEffect(() => {
    setParams((prev) => ({ ...prev, projectName: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  const { data: projectDailyStats, isLoading } = useProjectDailyStats(params);
  const { data: topFinalUrlsByCost, isLoading: isTopFinalUrlsLoading } = useTopFinalUrlsByCost(tabValue === TABS[1].value);

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
    <Tabs value={tabValue} onValueChange={setTabValue}>
      <TabsList className='bg-card/50 backdrop-blur-sm rounded-lg'>
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className='data-[state=active]:shadow-lg transition-all duration-300 '>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={TABS[0].value}>
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
      </TabsContent>

      <TabsContent value={TABS[1].value}>
        <TopFinalUrlTable topFinalUrlsByCost={topFinalUrlsByCost} loading={isTopFinalUrlsLoading} />
      </TabsContent>
    </Tabs>
  );
}
