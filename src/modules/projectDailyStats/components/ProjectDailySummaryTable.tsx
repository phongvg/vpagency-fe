import { projectDailySummaryColumnConfig } from "@/modules/projectDailyStats/configs/project-daily-summary-column.config";
import type { ProjectDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import type { VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface ProjectDailySummaryTableProps {
  projectDailySummary: ProjectDailyStatsSummary[];
}

const PAGE_SIZE = 10;

export default function ProjectDailySummaryTable({ projectDailySummary }: ProjectDailySummaryTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [page, setPage] = useState(1);

  const { user } = useAuthStore();

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return projectDailySummary.slice(start, end);
  }, [projectDailySummary, page]);

  const pageCount = Math.ceil(projectDailySummary.length / PAGE_SIZE);

  if (!user) return null;

  return (
    <AppTable
      data={paginatedData}
      columns={projectDailySummaryColumnConfig(user?.roles)}
      page={page}
      pageCount={pageCount}
      pageSize={PAGE_SIZE}
      onPageChange={(page) => setPage(page)}
      enableColumnVisibility
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}
