import { gmailColumnConfig } from "@/modules/gmail/configs/gmail-column.config";
import { useAssignGmail } from "@/modules/gmail/hooks/useAssignGmail";
import { useGmails } from "@/modules/gmail/hooks/useGmails";
import type { GmailListParams } from "@/modules/gmail/types/gmail.type";
import AppButton from "@/shared/components/common/AppButton";
import { AppTable } from "@/shared/components/common/AppTable";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import type { RowSelectionState, VisibilityState } from "@tanstack/react-table";
import type React from "react";
import { Fragment, useMemo, useState } from "react";

interface GmailTableProps {
  params: GmailListParams;
  setParams: React.Dispatch<React.SetStateAction<GmailListParams>>;
  onEdit: (gmailId: string) => void;
  onDelete: (gmailId: string) => void;
}

export default function GmailTable({ params, setParams, onEdit, onDelete }: GmailTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data, isLoading } = useGmails(params);

  const { confirm } = useConfirm();

  const gmails = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  const assignGmail = useAssignGmail();

  const columns = useMemo(() => gmailColumnConfig({ onEdit, onDelete }), [onEdit, onDelete]);

  const handleBulkAssign = async () => {
    const confirmed = await confirm({
      title: "Xác nhận gán gmail",
      description: `Bạn có chắc chắn muốn gán ${Object.keys(rowSelection).length} gmail đã chọn không?`,
      confirmText: "Xác nhận",
    });

    if (confirmed) {
      const gmailIds = Object.keys(rowSelection);

      await Promise.all(gmailIds.map((gmailId) => assignGmail.mutateAsync(gmailId)));
    }
  };

  return (
    <Fragment>
      {Object.keys(rowSelection).length > 0 && (
        <div className='flex items-center gap-4 bg-gray-900 mb-4 p-4 rounded-md'>
          <span className='font-medium'>Đã chọn {Object.keys(rowSelection).length} gmail</span>
          <AppButton size='sm' variant='outline' onClick={handleBulkAssign}>
            Gán gmail
          </AppButton>

          <AppButton size='sm' variant='outline' onClick={() => setRowSelection({})}>
            Bỏ chọn
          </AppButton>
        </div>
      )}

      <AppTable
        data={gmails}
        columns={columns}
        loading={isLoading}
        page={params.page}
        pageCount={meta?.totalPages}
        pageSize={params.limit}
        onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableColumnVisibility
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </Fragment>
  );
}
