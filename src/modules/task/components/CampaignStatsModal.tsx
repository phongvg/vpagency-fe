import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { useState } from "react";

interface CampaignStatsModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string | null;
  finalUrlId: string | null;
}

export default function CampaignStatsModal(props: CampaignStatsModalProps) {
  const [params, setParams] = useState<CampaignListParams>({
    page: 1,
    limit: 10,
    uid: undefined,
    externalId: undefined,
    gmail: undefined,
    campaignName: undefined,
    finalUrl: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    importAtFrom: undefined,
    importAtTo: undefined,
  });

  return <div>CampaignStatsModal</div>;
}
