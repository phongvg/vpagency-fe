import { gmailStatusColumnConfig } from "@/modules/gmailStatus/configs/gmail-status-column.config";
import { useDeleteGmailStatus } from "@/modules/gmailStatus/hooks/useDeleteGmailStatus";
import { useGmailStatuses } from "@/modules/gmailStatus/hooks/useGmailStatuses";
import { useUpdateGmailStatus } from "@/modules/gmailStatus/hooks/useUpdateGmailStatus";
import type { GmailStatusListParams } from "@/modules/gmailStatus/types/gmailStatus.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import type { VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface GmailStatusTableProps {
  params: GmailStatusListParams;
  setParams: React.Dispatch<React.SetStateAction<GmailStatusListParams>>;
  onOpenEdit: (id: string) => void;
}

export default function GmailStatusTable({ params, setParams, onOpenEdit }: GmailStatusTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { confirm } = useConfirm();

  const { data, isLoading } = useGmailStatuses(params);

  const gmailStatuses = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const updateGmailStatus = useUpdateGmailStatus();
  const deleteGmailStatus = useDeleteGmailStatus();

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    await updateGmailStatus.mutateAsync({ id, payload: { active: isActive } });
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      description: "Bạn có chắc chắn muốn xóa trạng thái Gmail này không? Hành động này không thể hoàn tác.",
    });

    if (isConfirmed) {
      await deleteGmailStatus.mutateAsync(id);
    }
  };

  return (
    <AppTable
      data={gmailStatuses}
      columns={gmailStatusColumnConfig({ onUpdateStatus: handleUpdateStatus, onEdit: onOpenEdit, onDelete: handleDelete })}
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
