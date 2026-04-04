import { appealedProxyApi } from "@/modules/appealedProxy/api/appealedProxy.api";
import type { UpdateAppealedProxyRequest } from "@/modules/appealedProxy/types/appealedProxy.type";
import { appealedProxyQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateAppealedProxy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: UpdateAppealedProxyRequest }) => appealedProxyApi.updateAppealedProxy(data.id, data.payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: appealedProxyQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: appealedProxyQueryKeys.detail(variables.id) });
      toast.success(res.message);
    },
  });
};
