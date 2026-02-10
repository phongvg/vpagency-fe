import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppInput } from "@/shared/components/common/AppInput";
import DatePicker from "@/shared/components/common/DatePicker/DatePicker";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { removeDash } from "@/shared/utils/common.util";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface CampaignListFilterProps {
  params: CampaignListParams;
  setParams: React.Dispatch<React.SetStateAction<CampaignListParams>>;
}

export default function CampaignListFilter({ params, setParams }: CampaignListFilterProps) {
  const [uidInput, setUidInput] = useState<string | undefined>(params.uid);
  const [campaignIdInput, setCampaignIdInput] = useState<string | undefined>(params.externalId);
  const [gmailInput, setGmailInput] = useState<string | undefined>(params.gmail);
  const [urlInput, setUrlInput] = useState<string | undefined>(params.finalUrl);

  const debouncedUid = useDebounce(uidInput, 500);
  const debouncedCampaignId = useDebounce(campaignIdInput, 500);
  const debouncedGmail = useDebounce(gmailInput, 500);
  const debouncedUrl = useDebounce(urlInput, 500);

  useEffect(() => {
    setUidInput(params.uid);
  }, [params.uid]);

  useEffect(() => {
    setCampaignIdInput(params.externalId);
  }, [params.externalId]);

  useEffect(() => {
    setGmailInput(params.gmail);
  }, [params.gmail]);

  useEffect(() => {
    setUrlInput(params.finalUrl);
  }, [params.finalUrl]);

  useEffect(() => {
    if (removeDash(debouncedUid) !== params.uid) {
      setParams((prev) => ({ ...prev, uid: removeDash(debouncedUid), page: 1 }));
    }
  }, [debouncedUid, params.uid, setParams]);

  useEffect(() => {
    if (debouncedCampaignId !== params.externalId) {
      setParams((prev) => ({ ...prev, externalId: debouncedCampaignId, page: 1 }));
    }
  }, [debouncedCampaignId, params.externalId, setParams]);

  useEffect(() => {
    if (debouncedGmail !== params.gmail) {
      setParams((prev) => ({ ...prev, gmail: debouncedGmail, page: 1 }));
    }
  }, [debouncedGmail, params.gmail, setParams]);

  useEffect(() => {
    if (debouncedUrl !== params.finalUrl) {
      setParams((prev) => ({ ...prev, finalUrl: debouncedUrl, page: 1 }));
    }
  }, [debouncedUrl, params.finalUrl, setParams]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lọc chiến dịch</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-2'>
          <DatePicker
            label='Ngày nhập dữ liệu từ'
            value={params.importAtFrom}
            onChange={(date) => setParams((prev) => ({ ...prev, importAtFrom: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
          />

          <DatePicker
            label='Ngày nhập dữ liệu đến'
            value={params.importAtTo}
            onChange={(date) => setParams((prev) => ({ ...prev, importAtTo: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
          />

          <DatePicker
            label='Dữ liệu từ ngày'
            value={params.dateFrom}
            onChange={(date) => setParams((prev) => ({ ...prev, dateFrom: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
          />

          <DatePicker
            label='Dữ liệu đến ngày'
            value={params.dateTo}
            onChange={(date) => setParams((prev) => ({ ...prev, dateTo: date ? format(date, "yyyy-MM-dd") : undefined, page: 1 }))}
          />

          <AppInput label='UID' placeholder='Tìm kiếm theo UID' value={uidInput} onChange={(e) => setUidInput(e.target.value)} />

          <AppInput
            label='ID chiến dịch'
            placeholder='Tìm kiếm theo ID chiến dịch'
            value={campaignIdInput}
            onChange={(e) => setCampaignIdInput(e.target.value)}
          />

          <AppInput label='Gmail' placeholder='Tìm kiếm theo Gmail' value={gmailInput} onChange={(e) => setGmailInput(e.target.value)} />

          <AppInput label='URL' placeholder='Tìm kiếm theo URL' value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
