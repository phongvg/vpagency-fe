import { projectStatusColumnConfig } from "@/modules/projectStatus/configs/project-status-column.config";
import { useDeleteProjectStatus } from "@/modules/projectStatus/hooks/useDeleteProjectStatus";
import { useProjectStatuses } from "@/modules/projectStatus/hooks/useProjectStatuses";
import { useUpdateProjectStatus } from "@/modules/projectStatus/hooks/useUpdateProjectStatus";
import type { ProjectStatusListParams } from "@/modules/projectStatus/types/projectStatus.type";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { AppTable } from "@/shared/components/common/AppTable";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import type { VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface ProjectStatusTableProps {
  params: ProjectStatusListParams;
  setParams: React.Dispatch<React.SetStateAction<ProjectStatusListParams>>;
  onOpenEdit: (id: string) => void;
}

export default function ProjectStatusTable({ params, setParams, onOpenEdit }: ProjectStatusTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { confirm } = useConfirm();

  const { data, isLoading } = useProjectStatuses(params);

  const projectStatuses = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const updateProjectStatus = useUpdateProjectStatus();
  const deleteProjectStatus = useDeleteProjectStatus();

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    await updateProjectStatus.mutateAsync({ id, payload: { active: isActive } });
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Xác nhận xóa trạng thái dự án",
      description: "Bạn có chắc chắn muốn xóa trạng thái dự án này không? Hành động này không thể hoàn tác.",
    });

    if (isConfirmed) {
      await deleteProjectStatus.mutateAsync(id);
    }
  };

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <AppTable
      data={projectStatuses}
      columns={projectStatusColumnConfig({ onUpdateStatus: handleUpdateStatus, onEdit: onOpenEdit, onDelete: handleDelete })}
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
