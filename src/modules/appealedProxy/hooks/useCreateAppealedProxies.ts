import { appealedProxyApi } from "@/modules/appealedProxy/api/appealedProxy.api";
import type { CreateAppealedProxyRequest } from "@/modules/appealedProxy/types/appealedProxy.type";
import { appealedProxyQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateAppealedProxies = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppealedProxyRequest[]) => appealedProxyApi.createAppealedProxies(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: appealedProxyQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
