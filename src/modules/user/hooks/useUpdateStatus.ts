import { userApi } from "@/modules/user/api/user.api";
import { userQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.updateUserStatus(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
