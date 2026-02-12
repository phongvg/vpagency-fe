import { meApi } from "@/modules/me/api/me.api";
import { userQueryKeys } from "@/shared/constants/query-keys.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => meApi.updateProfile(data),
    onSuccess: (res) => {
      const { setUser } = useAuthStore.getState();

      if (res?.data) {
        setUser(res.data);
        queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(res.data.id) });
      }

      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
