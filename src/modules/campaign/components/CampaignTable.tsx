import { campaignColumnConfig } from "@/modules/campaign/configs/campaign-column.config";
import { useCampaigns } from "@/modules/campaign/hooks/useCampaigns";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { AppTable } from "@/shared/components/common/AppTable";
import { useMemo } from "react";

interface CampaignTableProps {
  params: CampaignListParams;
  setParams: React.Dispatch<React.SetStateAction<CampaignListParams>>;
}

export default function CampaignTable({ params, setParams }: CampaignTableProps) {
  const { data, isLoading } = useCampaigns(params);

  const campaigns = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(() => data?.meta, [data]);

  if (isLoading) return <AppLoading loading={isLoading} />;

  return (
    <AppTable
      data={campaigns}
      columns={campaignColumnConfig()}
      page={params.page}
      pageCount={meta?.totalPages}
      pageSize={params.limit}
      onPageChange={(page, pageSize) => setParams((prev) => ({ ...prev, page, limit: pageSize }))}
    />
  );
}
