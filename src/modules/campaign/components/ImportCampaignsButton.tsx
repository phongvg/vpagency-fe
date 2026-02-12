import CurrencyRateModal from "@/modules/campaign/components/CurrencyRateModal";
import DateSelectModal from "@/modules/campaign/components/DateSelectModal";
import ImportCampaignPreviewModal from "@/modules/campaign/components/ImportCampaignPreviewModal";
import { useImportCampaignsExcel, type ImportCampaignData } from "@/modules/campaign/hooks/useImportCampaignsExcel";
import type { UpdateCampaignRequest } from "@/modules/campaign/types/campaign.type";
import { applyExchangeRate } from "@/modules/campaign/utils/campaign.util";
import { AppButton } from "@/shared/components/common/AppButton";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { Download } from "lucide-react";
import { Fragment, useMemo, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function ImportCampaignsButton() {
  const [campaigns, setCampaigns] = useState<UpdateCampaignRequest[]>([]);
  const [isOpenCurrencyRateModal, setIsOpenCurrencyRateModal] = useState(false);
  const [isOpenDateSelectModal, setIsOpenDateSelectModal] = useState(false);
  const [isOpenCampaignPreviewModal, setIsOpenCampaignPreviewModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<ImportCampaignData>({
    data: [],
    currencyRates: [],
  });

  const { processFile, isProcessing } = useImportCampaignsExcel();

  const inputCampaignRef = useRef<HTMLInputElement | null>(null);

  const isInvalidForm = useMemo(
    () => importData.currencyRates.some((currencyRate) => currencyRate.rateToUSD === null || currencyRate.rateToUSD <= 0),
    [importData.currencyRates]
  );

  const handleCampaignFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPendingFile(file);
    setIsOpenDateSelectModal(true);
    e.target.value = "";
  };

  const handleDateSelect = async () => {
    if (!pendingFile || !selectedDate) return;

    setIsOpenDateSelectModal(false);

    try {
      const { data, currencyRates } = await processFile(pendingFile, selectedDate);

      setImportData({ data, currencyRates });

      if (currencyRates.length > 0) {
        setIsOpenCurrencyRateModal(true);
      } else {
        setCampaigns(data);
        setIsOpenCampaignPreviewModal(true);
        toast.success(`Đã nhập ${data.length} chiến dịch thành công`);
      }
    } catch (err) {
      toast.error((err as Error).message ?? "Lỗi nhập dữ liệu");
    } finally {
      setPendingFile(null);
      setSelectedDate(undefined);
    }
  };

  const closeCurrencyRateModal = () => {
    setImportData({ data: [], currencyRates: [] });
    setIsOpenCurrencyRateModal(false);
  };

  const handleCurrencyRateChange = (rate: number, code: string) => {
    const currencyRates = importData.currencyRates.map((currencyRate) => {
      if (currencyRate.code === code) {
        currencyRate.rateToUSD = rate;
      }
      return currencyRate;
    });
    setImportData({ ...importData, currencyRates });
  };

  const handleCurrencyRateSubmit = () => {
    const defaultRate = 1;

    const record: Record<string, number> = importData.currencyRates.reduce(
      (acc, item) => {
        const rate = item.rateToUSD ?? defaultRate;
        acc[item.uid] = rate;
        return acc;
      },
      {} as Record<string, number>
    );

    const data = applyExchangeRate(importData.data, record);

    setCampaigns(data);
    setIsOpenCampaignPreviewModal(true);
    toast.success(`Đã nhập ${data.length} chiến dịch thành công`);
    closeCurrencyRateModal();
  };

  if (isProcessing) return <AppLoading loading={true} />;

  return (
    <Fragment>
      <AppButton variant='outline' size='sm' onClick={() => inputCampaignRef.current?.click()} disabled={isProcessing}>
        <Download />
        Nhập dữ liệu
      </AppButton>

      <input ref={inputCampaignRef} hidden type='file' multiple={false} accept='.xlsx, .xls' onChange={handleCampaignFileChange} />

      <DateSelectModal
        open={isOpenDateSelectModal}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onSubmit={handleDateSelect}
        onClose={() => setIsOpenDateSelectModal(false)}
      />

      <CurrencyRateModal
        open={isOpenCurrencyRateModal}
        currencyRates={importData.currencyRates}
        isInvalidForm={isInvalidForm}
        onChangeCurrencyRate={handleCurrencyRateChange}
        onSubmit={handleCurrencyRateSubmit}
        onClose={closeCurrencyRateModal}
      />

      <ImportCampaignPreviewModal campaigns={campaigns} open={isOpenCampaignPreviewModal} onClose={() => setIsOpenCampaignPreviewModal(false)} />
    </Fragment>
  );
}
