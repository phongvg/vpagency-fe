import VirtualAppealedProxyTable from "@/modules/appealedProxy/components/VirtualAppealedProxyTable";
import { useCreateAppealedProxies } from "@/modules/appealedProxy/hooks/useCreateAppealedProxies";
import type { CreateAppealedProxyRequest } from "@/modules/appealedProxy/types/appealedProxy.type";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

interface ImportAppealedProxyPreviewModalProps {
  open: boolean;
  proxies: CreateAppealedProxyRequest[];
  onClose: () => void;
}

export default function ImportAppealedProxyPreviewModal({ open, proxies, onClose }: ImportAppealedProxyPreviewModalProps) {
  const createProxies = useCreateAppealedProxies();

  const handleImport = async () => {
    await createProxies.mutateAsync(proxies, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full sm:max-w-3xl lg:max-w-5xl'>
        <DialogHeader>
          <DialogTitle>Đã đọc {proxies.length} proxy từ file Excel</DialogTitle>
        </DialogHeader>

        <VirtualAppealedProxyTable proxies={proxies} />

        <DialogFooter>
          <AppButton type='button' variant='secondary' onClick={onClose}>
            Đóng
          </AppButton>

          <AppButton type='button' variant='default' onClick={handleImport} loading={createProxies.isPending}>
            Nhập dữ liệu
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
