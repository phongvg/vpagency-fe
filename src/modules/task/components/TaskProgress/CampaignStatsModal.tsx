import CampaignListFilter from "@/modules/campaign/components/CampaignListFilter";
import { campaignColumnConfig } from "@/modules/campaign/configs/campaign-column.config";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { useAssignCampaignToFinalUrl } from "@/modules/task/hooks/useAssignCampaignToFinalUrl";
import { useCampaignStatsFinalUrl } from "@/modules/task/hooks/useCampaignStatsFinalUrl";
import { AppButton } from "@/shared/components/common/AppButton";
import { AppTable } from "@/shared/components/common/AppTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { useConfirm } from "@/shared/contexts/ConfirmContext";
import type { RowSelectionState, VisibilityState } from "@tanstack/react-table";
import { Funnel } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

interface CampaignStatsModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
  finalUrlId: string | null;
}

export default function CampaignStatsModal({ open, onClose, taskId, finalUrlId }: CampaignStatsModalProps) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [params, setParams] = useState<CampaignListParams>({
    page: 1,
    limit: 10,
    uid: undefined,
    externalId: undefined,
    gmail: undefined,
    finalUrl: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    importAtFrom: undefined,
    importAtTo: undefined,
  });

  const { confirm } = useConfirm();

  const { data } = useCampaignStatsFinalUrl({ taskId, finalUrlId, params });
  const campaigns = useMemo(() => data?.data.items || [], [data]);
  const meta = useMemo(() => data?.data.meta, [data]);

  const assignCampaignToFinalUrl = useAssignCampaignToFinalUrl();
  const removeCampaignFromFinalUrl = useAssignCampaignToFinalUrl();

  const handleBulkAssign = async () => {
    const confirmed = await confirm({
      title: "Xác nhận gán chiến dịch",
      description: `Bạn có chắc chắn muốn gán ${Object.keys(rowSelection).length} chiến dịch đã chọn không?`,
      confirmText: "Xác nhận",
      cancelText: "Hủy",
    });

    if (confirmed) {
      if (!taskId) {
        toast.error("Task ID không hợp lệ");
        return;
      }

      if (!finalUrlId) {
        toast.error("URL ID không hợp lệ");
        return;
      }

      const campaignIds = Object.keys(rowSelection);

      await assignCampaignToFinalUrl.mutateAsync(
        {
          id: taskId,
          payload: {
            finalUrlId,
            campaignDailyStatIds: campaignIds,
          },
        },
        {
          onSuccess: () => {
            setRowSelection({});
          },
        }
      );
    }
  };

  const handleBulkRemove = async () => {
    const confirmed = await confirm({
      title: "Xác nhận loại bỏ chiến dịch",
      description: `Bạn có chắc chắn muốn loại bỏ ${Object.keys(rowSelection).length} chiến dịch đã chọn không?`,
      confirmText: "Xác nhận",
      cancelText: "Hủy",
    });

    if (confirmed) {
      if (!taskId) {
        toast.error("Task ID không hợp lệ");
        return;
      }

      if (!finalUrlId) {
        toast.error("URL ID không hợp lệ");
        return;
      }

      const campaignIds = Object.keys(rowSelection);

      await removeCampaignFromFinalUrl.mutateAsync(
        {
          id: taskId,
          payload: {
            finalUrlId,
            campaignDailyStatIds: campaignIds,
          },
        },
        {
          onSuccess: () => {
            setRowSelection({});
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full lg:max-w-9xl sm:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>Danh sách chiến dịch</DialogTitle>
        </DialogHeader>

        <div className='space-y-2 min-w-0'>
          <div className='flex justify-between items-center'>
            <Popover open={isOpenFilter} onOpenChange={setIsOpenFilter}>
              <PopoverTrigger asChild>
                <AppButton type='button' variant='outline' size='sm' onClick={() => setIsOpenFilter(!isOpenFilter)}>
                  <Funnel />
                  Lọc
                </AppButton>
              </PopoverTrigger>

              <PopoverContent className='p-0'>
                <CampaignListFilter params={params} setParams={setParams} />
              </PopoverContent>
            </Popover>
          </div>

          {Object.keys(rowSelection).length > 0 && (
            <div className='flex items-center gap-4 bg-gray-900 p-4'>
              <span className='font-medium'>Đã chọn {Object.keys(rowSelection).length} chiến dịch</span>
              <AppButton size='sm' variant='outline' onClick={handleBulkAssign}>
                Gán chiến dịch
              </AppButton>

              <AppButton size='sm' variant='outline' onClick={handleBulkRemove}>
                Loại bỏ chiến dịch
              </AppButton>

              <AppButton size='sm' variant='outline' onClick={() => setRowSelection({})}>
                Bỏ chọn
              </AppButton>
            </div>
          )}

          <AppTable
            data={campaigns}
            columns={campaignColumnConfig()}
            page={params.page}
            pageCount={meta?.totalPages}
            pageSize={params.limit}
            onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
            enableRowSelection
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            enableColumnVisibility
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            getRowClassName={(campaign) => (campaign.finalUrlId ? "font-bold bg-red-500/20" : "")}
          />
        </div>

        <div className='flex justify-end gap-2'>
          <AppButton type='button' variant='outline' size='sm' onClick={onClose}>
            Đóng
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
