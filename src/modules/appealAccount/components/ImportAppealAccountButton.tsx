import ImportAppealAccountPreviewModal from "@/modules/appealAccount/components/ImportAppealAccountPreviewModal";
import { useImportAppealAccountExcel } from "@/modules/appealAccount/hooks/useImportAppealAccountExcel";
import type { UpdateAppealAccountRequest } from "@/modules/appealAccount/types/appealAccount.type";
import { AppButton } from "@/shared/components/common/AppButton";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { Download } from "lucide-react";
import { Fragment, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function ImportAppealAccountButton() {
  const [appealAccounts, setAppealAccounts] = useState<UpdateAppealAccountRequest[]>([]);
  const [isAppealAccountPreviewModalOpen, setIsAppealAccountPreviewModalOpen] = useState(false);
  const { processFile, isProcessing } = useImportAppealAccountExcel();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAppealAccountFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await processFile(file);

      setAppealAccounts(data);
      toast.success(`Đã nhập ${data.length} tài khoản thành công`);
      setIsAppealAccountPreviewModalOpen(true);
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

      <input ref={inputRef} hidden type='file' multiple={false} accept='.xlsx, .xls' onChange={handleAppealAccountFileChange} />

      <ImportAppealAccountPreviewModal
        open={isAppealAccountPreviewModalOpen}
        appealAccounts={appealAccounts}
        onClose={() => setIsAppealAccountPreviewModalOpen(false)}
      />
    </Fragment>
  );
}
