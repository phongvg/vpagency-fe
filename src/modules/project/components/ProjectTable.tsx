import { projectColumnConfig } from "@/modules/project/configs/project-column.config";
import { useProjects } from "@/modules/project/hooks/useProjects";
import type { ProjectListParams } from "@/modules/project/types/project.type";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { AppTable } from "@/shared/components/common/AppTable";
import type { VisibilityState } from "@tanstack/react-table";
import type React from "react";
import { useMemo, useState } from "react";

interface ProjectTableProps {
  params: ProjectListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectListParams>>;
  onEdit: (projectId: string | null) => void;
  onDelete: (projectId: string) => void;
}

export default function ProjectTable({ params, setParams, onEdit, onDelete }: ProjectTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data, isLoading } = useProjects(params);

  const projects = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <AppTable
      data={projects}
      columns={projectColumnConfig({ onEdit, onDelete })}
      page={params.page}
      pageCount={meta?.totalPages}
      pageSize={params.limit}
      onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
      enableColumnVisibility
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    />
  );
}
