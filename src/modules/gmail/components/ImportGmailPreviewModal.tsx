import VirtualGmailTable from "@/modules/gmail/components/VirtualGmailTable";
import { useCreateGmails } from "@/modules/gmail/hooks/useCreateGmails";
import type { UpdateGmailRequest } from "@/modules/gmail/types/gmail.type";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

interface ImportGmailPreviewModalProps {
  open: boolean;
  gmails: UpdateGmailRequest[];
  onClose: () => void;
}

export default function ImportGmailPreviewModal({ open, gmails, onClose }: ImportGmailPreviewModalProps) {
  const createGmails = useCreateGmails();

  const handleImport = async () => {
    await createGmails.mutateAsync(gmails, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full lg:max-w-9xl sm:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>Đã đọc {gmails.length} gmail từ file Excel</DialogTitle>
        </DialogHeader>

        <VirtualGmailTable gmails={gmails} />

        <DialogFooter>
          <AppButton variant='outline' onClick={onClose}>
            Đóng
          </AppButton>
          <AppButton variant='outline' onClick={handleImport} loading={createGmails.isPending}>
            Nhập dữ liệu
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
