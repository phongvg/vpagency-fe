import CampaignForm from "@/modules/campaign/components/CampaignForm";
import { useCampaignDetail } from "@/modules/campaign/hooks/useCampaignDetail";
import { useQueryParam } from "@/shared/hooks/useQueryParam";

export default function CampaignEditPage() {
  const queryId = useQueryParam("id");
  const campaignId = queryId ?? null;

  const { data: campaignDetail } = useCampaignDetail(campaignId);

  return <CampaignForm campaign={campaignDetail} />;
}
