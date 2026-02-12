import { appealAccountApi } from "@/modules/appealAccount/api/appealAccount.api";
import type { UpdateAppealAccountRequest } from "@/modules/appealAccount/types/appealAccount.type";
import { appealAccountQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateAppealAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: UpdateAppealAccountRequest }) => appealAccountApi.updateAppealAccount(data.id, data.payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: appealAccountQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
