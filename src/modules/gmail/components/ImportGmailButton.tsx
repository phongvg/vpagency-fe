import ImportGmailPreviewModal from "@/modules/gmail/components/ImportGmailPreviewModal";
import { useImportGmailExcel } from "@/modules/gmail/hooks/useImportGmailExcel";
import type { UpdateGmailRequest } from "@/modules/gmail/types/gmail.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { Download } from "lucide-react";
import { Fragment, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function ImportGmailButton() {
  const [gmail, setGmail] = useState<UpdateGmailRequest[]>([]);
  const [isGmailPreviewDialogOpen, setIsGmailPreviewDialogOpen] = useState(false);
  const { processFile, isProcessing } = useImportGmailExcel();

  const inputGmailRef = useRef<HTMLInputElement | null>(null);

  const handleGmailFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await processFile(file);

      setGmail(data);
      toast.success(`Đã nhập  ${data.length} email thành công`);
      setIsGmailPreviewDialogOpen(true);
    } catch (err) {
      toast.error((err as Error).message ?? "Lỗi nhập dữ liệu");
    } finally {
      e.target.value = "";
    }
  };

  if (isProcessing) return <AppLoading loading={true} />;

  return (
    <Fragment>
      <AppButton variant='outline' size='sm' onClick={() => inputGmailRef.current?.click()} loading={isProcessing}>
        <Download />
        Nhập dữ liệu
      </AppButton>

      <input ref={inputGmailRef} hidden type='file' multiple={false} accept='.xlsx, .xls' onChange={handleGmailFileChange} />

      <ImportGmailPreviewModal open={isGmailPreviewDialogOpen} gmails={gmail} onClose={() => setIsGmailPreviewDialogOpen(false)} />
    </Fragment>
  );
}
