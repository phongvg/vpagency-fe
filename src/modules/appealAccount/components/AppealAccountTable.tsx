import { appealAccountColumnConfig } from "@/modules/appealAccount/configs/appeal-account-column.config";
import { useAppealAccounts } from "@/modules/appealAccount/hooks/useAppealAccounts";
import { useDeleteAppealAccount } from "@/modules/appealAccount/hooks/useDeleteAppealAccount";
import type { AppealAccountListParams } from "@/modules/appealAccount/types/appealAccount.type";
import { AppTable } from "@/shared/components/common/AppTable";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import type { VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface AppealAccountTableProps {
  params: AppealAccountListParams;
  setParams: React.Dispatch<React.SetStateAction<AppealAccountListParams>>;
  onOpenEdit: (id: string) => void;
}

export default function AppealAccountTable({ params, setParams, onOpenEdit }: AppealAccountTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { confirm } = useConfirm();

  const { data, isLoading } = useAppealAccounts(params);

  const appealAccounts = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const deleteAppealAccount = useDeleteAppealAccount();

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      description: "Bạn có chắc chắn muốn xóa tài khoản kháng cáo này không? Hành động này không thể hoàn tác.",
    });

    if (isConfirmed) {
      await deleteAppealAccount.mutateAsync(id);
    }
  };

  return (
    <AppTable
      data={appealAccounts}
      columns={appealAccountColumnConfig({ onEdit: onOpenEdit, onDelete: handleDelete })}
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
