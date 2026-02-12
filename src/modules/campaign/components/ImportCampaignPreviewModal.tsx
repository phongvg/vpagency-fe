import VirtualCampaignTable from "@/modules/campaign/components/VirtualCampaignTable";
import { useCreateCampaigns } from "@/modules/campaign/hooks/useCreateCampaign";
import type { UpdateCampaignRequest } from "@/modules/campaign/types/campaign.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

interface ImportCampaignPreviewModalProps {
  open: boolean;
  campaigns: UpdateCampaignRequest[];
  onClose: () => void;
}

export default function ImportCampaignPreviewModal({ open, campaigns, onClose }: ImportCampaignPreviewModalProps) {
  const createCampaigns = useCreateCampaigns();

  const handleImport = async () => {
    await createCampaigns.mutateAsync(campaigns);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full lg:max-w-9xl sm:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>Đã đọc {campaigns.length} chiến dịch từ file Excel</DialogTitle>
        </DialogHeader>

        <VirtualCampaignTable campaigns={campaigns} />

        <DialogFooter>
          <AppButton variant='outline' onClick={onClose}>
            Đóng
          </AppButton>
          <AppButton variant='outline' onClick={handleImport} loading={createCampaigns.isPending}>
            Nhập dữ liệu
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
