import { userApi } from "@/modules/user/api/user.api";
import { userQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useUserDetail = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: userQueryKeys.detail(id!),
    queryFn: () => userApi.getUserById(id!),
    select: (res) => res.data,
  });
};
