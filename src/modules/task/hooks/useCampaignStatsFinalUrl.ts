import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useCampaignStatsFinalUrl = ({
  taskId,
  finalUrlId,
  params,
}: {
  taskId: string | null;
  finalUrlId: string | null;
  params: CampaignListParams;
}) => {
  return useQuery({
    queryKey: taskQueryKeys.campaignStatsFinalUrl(taskId!, finalUrlId!, params),
    queryFn: () => taskApi.getCampaignStatsByFinalUrl({ taskId: taskId!, finalUrlId: finalUrlId!, params }),
    enabled: !!taskId && !!finalUrlId,
  });
};
