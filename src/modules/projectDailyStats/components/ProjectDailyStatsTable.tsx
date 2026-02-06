import { projectDailyStatsColumnConfig } from "@/modules/projectDailyStats/configs/project-daily-stats-column.config";
import type { ProjectDailyStatsListParams, ProjectDailyStatsResponse } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import type { VisibilityState } from "@tanstack/react-table";
import { useState } from "react";

interface ProjectDailyStatsTableProps {
  projectDailyStats: ProjectDailyStatsResponse;
  params: ProjectDailyStatsListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectDailyStatsListParams>>;
}

export default function ProjectDailyStatsTable({ projectDailyStats, params, setParams }: ProjectDailyStatsTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { user } = useAuthStore();

  const handleEdit = (id: string) => {};

  const handleDelete = (id: string) => {};

  return (
    <AppTable
      data={projectDailyStats.data.items}
      columns={projectDailyStatsColumnConfig({ roles: user?.roles, onOpenEdit: handleEdit, onDelete: handleDelete })}
      page={params.page}
      pageCount={projectDailyStats.data.meta?.totalPages}
      pageSize={params.limit}
      onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
      enableColumnVisibility
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}
