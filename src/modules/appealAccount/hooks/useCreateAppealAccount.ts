import { appealAccountApi } from "@/modules/appealAccount/api/appealAccount.api";
import type { UpdateAppealAccountRequest } from "@/modules/appealAccount/types/appealAccount.type";
import { appealAccountQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateAppealAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAppealAccountRequest) => appealAccountApi.createAppealAccount(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: appealAccountQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
