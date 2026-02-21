import VirtualGmailTable from "@/modules/campaign/components/VirtualGmailTable";
import { useCreateGmail } from "@/modules/campaign/hooks/useCreateGmail";
import type { GmailUIDMapping } from "@/modules/campaign/types/campaign.type";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

interface ImportGmailPreviewModalProps {
  open: boolean;
  gmail: GmailUIDMapping[];
  onClose: () => void;
}

export default function ImportGmailPreviewModal({ open, gmail, onClose }: ImportGmailPreviewModalProps) {
  const createGmail = useCreateGmail();

  const handleImport = async () => {
    await createGmail.mutateAsync(gmail);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full lg:max-w-9xl sm:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>Đã đọc {gmail.length} gmail từ file Excel</DialogTitle>
        </DialogHeader>

        <VirtualGmailTable gmail={gmail} />

        <DialogFooter>
          <AppButton variant='outline' onClick={onClose}>
            Đóng
          </AppButton>
          <AppButton variant='outline' onClick={handleImport} loading={createGmail.isPending}>
            Nhập dữ liệu
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
