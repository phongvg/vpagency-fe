import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";

interface CampaignListFilterProps {
  params: CampaignListParams;
  setParams: (params: CampaignListParams) => void;
}

export default function CampaignListFilter({ params, setParams }: CampaignListFilterProps) {
  const [campaignNameInput, setCampaignNameInput] = useState(params.campaignName || "");

  const debouncedCampaignName = useDebounce(campaignNameInput, 500);

  useEffect(() => {
    setParams({ campaignName: debouncedCampaignName });
  }, [debouncedCampaignName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lọc chiến dịch</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-2'>
          <Input placeholder='Tên chiến dịch' value={campaignNameInput} onChange={(e) => setCampaignNameInput(e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
