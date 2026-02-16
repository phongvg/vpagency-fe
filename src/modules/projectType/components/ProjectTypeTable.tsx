import { projectTypeColumnConfig } from "@/modules/projectType/configs/project-type-column.config";
import { useDeleteProjectType } from "@/modules/projectType/hooks/useDeleteProjectType";
import { useProjectTypes } from "@/modules/projectType/hooks/useProjectTypes";
import type { ProjectTypeListParams } from "@/modules/projectType/types/projectType.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import type { VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface ProjectTypeTableProps {
  params: ProjectTypeListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectTypeListParams>>;
  onOpenEdit: (id: string) => void;
}

export default function ProjectTypeTable({ params, setParams, onOpenEdit }: ProjectTypeTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { confirm } = useConfirm();

  const { data, isLoading } = useProjectTypes(params);

  const projectTypes = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const deleteProjectType = useDeleteProjectType();

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      description: "Bạn có chắc chắn muốn xóa loại dự án này không? Hành động này không thể hoàn tác.",
    });

    if (isConfirmed) {
      await deleteProjectType.mutateAsync(id);
    }
  };

  return (
    <AppTable
      data={projectTypes}
      columns={projectTypeColumnConfig({ onEdit: onOpenEdit, onDelete: handleDelete })}
      loading={isLoading}
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
