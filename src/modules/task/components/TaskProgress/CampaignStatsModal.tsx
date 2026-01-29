import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Save } from "lucide-react";
import { useState } from "react";

interface CampaignStatsModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
  finalUrlId: string | null;
}

export default function CampaignStatsModal({ open, onClose, taskId, finalUrlId }: CampaignStatsModalProps) {
  const [params, setParams] = useState<CampaignListParams>({
    page: 1,
    limit: 10,
    uid: undefined,
    externalId: undefined,
    gmail: undefined,
    campaignName: undefined,
    finalUrl: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    importAtFrom: undefined,
    importAtTo: undefined,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tiến độ công việc</DialogTitle>
        </DialogHeader>

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
