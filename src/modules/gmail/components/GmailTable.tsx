import { gmailColumnConfig } from "@/modules/gmail/configs/gmail-column.config";
import { useGmails } from "@/modules/gmail/hooks/useGmails";
import type { GmailListParams } from "@/modules/gmail/types/gmail.type";
import { AppTable } from "@/shared/components/common/AppTable";
import type { VisibilityState } from "@tanstack/react-table";
import type React from "react";
import { useMemo, useState } from "react";

interface GmailTableProps {
  params: GmailListParams;
  setParams: React.Dispatch<React.SetStateAction<GmailListParams>>;
  onEdit: (gmailId: string) => void;
  onDelete: (gmailId: string) => void;
}

export default function GmailTable({ params, setParams, onEdit, onDelete }: GmailTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data, isLoading } = useGmails(params);

  const gmails = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const columns = useMemo(() => gmailColumnConfig({ onEdit, onDelete }), [onEdit, onDelete]);

  return (
    <AppTable
      data={gmails}
      columns={columns}
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
