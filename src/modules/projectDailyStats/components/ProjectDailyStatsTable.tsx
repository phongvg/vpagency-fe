import { projectDailyStatsColumnConfig } from "@/modules/projectDailyStats/configs/project-daily-stats-column.config";
import type { ProjectDailyStats, ProjectDailyStatsListParams } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import type { Meta } from "@/shared/types/common/apiResponse.type";
import type { VisibilityState } from "@tanstack/react-table";
import { useState } from "react";

interface ProjectDailyStatsTableProps {
  data: ProjectDailyStats[];
  loading: boolean;
  params: ProjectDailyStatsListParams;
  meta: Meta | undefined;
  setParams: React.Dispatch<React.SetStateAction<ProjectDailyStatsListParams>>;
  onEdit: (reportId: string | null) => void;
  onDelete: (reportId: string) => void;
}

export default function ProjectDailyStatsTable({ data, loading, params, setParams, onEdit, onDelete, meta }: ProjectDailyStatsTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { user } = useAuthStore();

  return (
    <AppTable
      data={data || []}
      columns={projectDailyStatsColumnConfig({ roles: user?.roles, onEdit, onDelete })}
      loading={loading}
      page={params.page}
      pageCount={meta?.totalPages || 0}
      pageSize={params.limit}
      onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
      enableColumnVisibility
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}
