import { urls } from "@/app/routes/route.constant";
import { authApi } from "@/auth/api/auth.api";
import { authService } from "@/auth/services/auth.service";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const redirect = useQueryParam("redirect") || `${urls.root}${urls.dashboard}`;

  const loginMutation = useMutation({
    mutationFn: (params: { username: string; password: string }) => authApi.login(params),
    onSuccess: (res) => {
      authService.login(res.data);
      navigate(redirect, { replace: true });
    },
  });

  const login = (username: string, password: string) => {
    return loginMutation.mutateAsync({ username, password });
  };

  const logout = () => {
    authService.logout();
    navigate(`${urls.auth}/${urls.login}`, { replace: true });
  };

  return { login, logout, isLoggingIn: loginMutation.isPending };
};
