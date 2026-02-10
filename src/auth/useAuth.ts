import { urls } from "@/app/routes/route.constant";
import { authApi } from "@/auth/api/auth.api";
import { authService } from "@/auth/services/auth.service";
import type { LoginPayload } from "@/auth/types/auth.type";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const redirect = useQueryParam("redirect") || `${urls.root}${urls.dashboard}`;

  const loginMutation = useMutation({
    mutationFn: (params: LoginPayload) => authApi.login(params),
    onSuccess: (res) => {
      authService.login(res.data);

      setTimeout(() => {
        navigate(redirect, { replace: true });
      }, 0);
    },
  });

  const loginTelegramMutation = useMutation({
    mutationFn: (code: string) => authApi.loginTelegram(code),
    onSuccess: (res) => {
      authService.login(res.data);

      setTimeout(() => {
        navigate(redirect, { replace: true });
      }, 0);
    },
    onError: () => {
      toast.error("Đăng nhập thất bại");
      navigate(`${urls.auth}/${urls.login}`);
    },
  });

  const login = (username: string, password: string) => {
    return loginMutation.mutateAsync({ username, password });
  };

  const logout = () => {
    authService.logout();
    navigate(`${urls.auth}/${urls.login}`, { replace: true });
  };

  return {
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
    loginTelegram: loginTelegramMutation.mutateAsync,
    isLoggingInTelegram: loginTelegramMutation.isPending,
  };
};
