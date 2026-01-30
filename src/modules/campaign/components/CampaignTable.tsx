import { campaignColumnConfig } from "@/modules/campaign/configs/campaign-column.config";
import { useCampaigns } from "@/modules/campaign/hooks/useCampaigns";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { AppTable } from "@/shared/components/common/AppTable";

interface CampaignTableProps {
  params: CampaignListParams;
}

export default function CampaignTable({ params }: CampaignTableProps) {
  const { data, isLoading } = useCampaigns(params);

  if (isLoading) return <AppLoading loading={isLoading} />;

  return <AppTable data={data?.items || []} columns={campaignColumnConfig()} />;
}
