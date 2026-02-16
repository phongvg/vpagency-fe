import { projectDailyStatsColumnConfig } from "@/modules/projectDailyStats/configs/project-daily-stats-column.config";
import type { ProjectDailyStatsListParams, ProjectDailyStatsResponse } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import type { VisibilityState } from "@tanstack/react-table";
import { useState } from "react";

interface ProjectDailyStatsTableProps {
  projectDailyStats: ProjectDailyStatsResponse | undefined;
  loading: boolean;
  params: ProjectDailyStatsListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectDailyStatsListParams>>;
  onEdit: (reportId: string | null) => void;
  onDelete: (reportId: string) => void;
}

export default function ProjectDailyStatsTable({ projectDailyStats, loading, params, setParams, onEdit, onDelete }: ProjectDailyStatsTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { user } = useAuthStore();

  return (
    <AppTable
      data={projectDailyStats?.data?.items || []}
      columns={projectDailyStatsColumnConfig({ roles: user?.roles, onEdit, onDelete })}
      loading={loading}
      page={params.page}
      pageCount={projectDailyStats?.data?.meta?.totalPages}
      pageSize={params.limit}
      onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
      enableColumnVisibility
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}
