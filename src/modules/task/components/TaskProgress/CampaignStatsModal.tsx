import CampaignListFilter from "@/modules/campaign/components/CampaignListFilter";
import { campaignColumnConfig } from "@/modules/campaign/configs/campaign-column.config";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { useCampaignStatsFinalUrl } from "@/modules/task/hooks/useCampaignStatsFinalUrl";
import { AppButton } from "@/shared/components/common/AppButton";
import { AppTable } from "@/shared/components/common/AppTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Funnel, Save } from "lucide-react";
import { useMemo, useState } from "react";

interface CampaignStatsModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
  finalUrlId: string | null;
}

export default function CampaignStatsModal({ open, onClose, taskId, finalUrlId }: CampaignStatsModalProps) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
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

  const { data } = useCampaignStatsFinalUrl({ taskId, finalUrlId, params });
  const campaigns = useMemo(() => data?.data.items || [], [data]);
  const meta = useMemo(() => data?.data.meta, [data]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full lg:max-w-9xl sm:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>Tiến độ công việc</DialogTitle>
        </DialogHeader>

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

        <div className='overflow-x-auto'>
          <AppTable
            data={campaigns}
            columns={campaignColumnConfig()}
            page={params.page}
            pageCount={meta?.totalPages}
            pageSize={params.limit}
            onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
          />
        </div>

        <div className='flex justify-end gap-2'>
          <AppButton type='button' variant='outline' size='sm' onClick={onClose}>
            Hủy
          </AppButton>

          <AppButton type='submit' variant='outline' size='sm'>
            <Save />
            Xác nhận
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
