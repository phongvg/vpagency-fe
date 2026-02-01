import { campaignApi } from "@/modules/campaign/api/campaign.api";
import type { GmailUIDMapping } from "@/modules/campaign/types/campaign.type";
import { campaignQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateGmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gmail: GmailUIDMapping[]) => campaignApi.importGmail({ mappings: gmail }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
