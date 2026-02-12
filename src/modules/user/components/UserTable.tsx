import { userColumnConfig } from "@/modules/user/configs/user-column.config";
import { useUpdateStatus } from "@/modules/user/hooks/useUpdateStatus";
import { useUsers } from "@/modules/user/hooks/useUsers";
import type { UserListParams } from "@/modules/user/types/user.type";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { AppTable } from "@/shared/components/common/AppTable";
import type { VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface UserTableProps {
  params: UserListParams;
  setParams: React.Dispatch<React.SetStateAction<UserListParams>>;
  onOpenEdit: (id: string) => void;
  onOpenChangePassword: (id: string) => void;
}

export default function UserTable({ params, setParams, onOpenEdit, onOpenChangePassword }: UserTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data, isLoading } = useUsers(params);

  const users = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const updateStatus = useUpdateStatus();

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <AppTable
      data={users}
      columns={userColumnConfig({ onUpdateStatus: updateStatus.mutate, onOpenEdit, onOpenChangePassword })}
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
