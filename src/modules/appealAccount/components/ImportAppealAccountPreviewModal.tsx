import VirtualAppealAccountTable from "@/modules/appealAccount/components/VirtualAppealAccountTable";
import { useCreateAppealAccounts } from "@/modules/appealAccount/hooks/useCreateAppealAccounts";
import type { UpdateAppealAccountRequest } from "@/modules/appealAccount/types/appealAccount.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

interface ImportAppealAccountPreviewModalProps {
  open: boolean;
  appealAccounts: UpdateAppealAccountRequest[];
  onClose: () => void;
}

export default function ImportAppealAccountPreviewModal({ open, appealAccounts, onClose }: ImportAppealAccountPreviewModalProps) {
  const createAppealAccounts = useCreateAppealAccounts();

  const handleImport = async () => {
    await createAppealAccounts.mutateAsync(appealAccounts, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full lg:max-w-9xl sm:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>Đã đọc {appealAccounts.length} tài khoản từ file Excel</DialogTitle>
        </DialogHeader>

        <VirtualAppealAccountTable appealAccounts={appealAccounts} />

        <DialogFooter>
          <AppButton type='button' variant='outline' onClick={onClose}>
            Đóng
          </AppButton>

          <AppButton type='button' variant='outline' onClick={handleImport} loading={createAppealAccounts.isPending}>
            Nhập dữ liệu
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
