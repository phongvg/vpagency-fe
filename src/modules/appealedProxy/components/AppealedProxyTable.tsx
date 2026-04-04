import { appealedProxyColumnConfig } from "@/modules/appealedProxy/configs/appealed-proxy-column.config";
import { useAppealedProxies } from "@/modules/appealedProxy/hooks/useAppealedProxies";
import { useDeleteAppealedProxy } from "@/modules/appealedProxy/hooks/useDeleteAppealedProxy";
import type { AppealedProxyListParams } from "@/modules/appealedProxy/types/appealedProxy.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import type { VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface AppealedProxyTableProps {
  params: AppealedProxyListParams;
  setParams: React.Dispatch<React.SetStateAction<AppealedProxyListParams>>;
  onOpenEdit: (id: string) => void;
}

export default function AppealedProxyTable({ params, setParams, onOpenEdit }: AppealedProxyTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { confirm } = useConfirm();

  const { data, isLoading } = useAppealedProxies(params);

  const proxies = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const deleteProxy = useDeleteAppealedProxy();

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      description: "Bạn có chắc chắn muốn xóa proxy này không? Hành động này không thể hoàn tác.",
    });

    if (isConfirmed) {
      await deleteProxy.mutateAsync(id);
    }
  };

  return (
    <AppTable
      data={proxies}
      columns={appealedProxyColumnConfig({ onEdit: onOpenEdit, onDelete: handleDelete })}
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
