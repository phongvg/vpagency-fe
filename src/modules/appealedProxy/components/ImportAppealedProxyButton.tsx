import ImportAppealedProxyPreviewModal from "@/modules/appealedProxy/components/ImportAppealedProxyPreviewModal";
import { useImportAppealedProxyExcel } from "@/modules/appealedProxy/hooks/useImportAppealedProxyExcel";
import type { CreateAppealedProxyRequest } from "@/modules/appealedProxy/types/appealedProxy.type";
import AppButton from "@/shared/components/common/AppButton";
import AppLoading from "@/shared/components/common/AppLoading";
import { Download } from "lucide-react";
import { Fragment, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function ImportAppealedProxyButton() {
  const [proxies, setProxies] = useState<CreateAppealedProxyRequest[]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const { processFile, isProcessing } = useImportAppealedProxyExcel();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await processFile(file);

      setProxies(data);
      toast.success(`Đã nhập ${data.length} proxy thành công`);
      setIsPreviewModalOpen(true);
    } catch (err) {
      toast.error((err as Error).message ?? "Lỗi nhập dữ liệu");
    } finally {
      e.target.value = "";
    }
  };

  if (isProcessing) return <AppLoading loading={true} />;

  return (
    <Fragment>
      <AppButton variant='outline' size='sm' onClick={() => inputRef.current?.click()} loading={isProcessing}>
        <Download />
        Nhập dữ liệu
      </AppButton>

      <input ref={inputRef} hidden type='file' multiple={false} accept='.xlsx, .xls' onChange={handleFileChange} />

      <ImportAppealedProxyPreviewModal open={isPreviewModalOpen} proxies={proxies} onClose={() => setIsPreviewModalOpen(false)} />
    </Fragment>
  );
}
