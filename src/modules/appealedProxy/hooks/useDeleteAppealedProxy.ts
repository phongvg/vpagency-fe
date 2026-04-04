import { appealedProxyApi } from "@/modules/appealedProxy/api/appealedProxy.api";
import { appealedProxyQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteAppealedProxy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appealedProxyApi.deleteAppealedProxy(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: appealedProxyQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
