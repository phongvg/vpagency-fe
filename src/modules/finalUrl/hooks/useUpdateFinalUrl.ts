import { finalUrlApi } from "@/modules/finalUrl/api/final-url.api";
import type { UpdateFinalUrlRequest } from "@/modules/finalUrl/types/finalUrl.type";
import { finalUrlQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateFinalUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFinalUrlRequest }) => finalUrlApi.updateFinalUrl(id, data),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: finalUrlQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: finalUrlQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
