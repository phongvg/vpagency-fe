import { urls } from "@/app/routes/route.constant";
import { authService } from "@/auth/services/auth.service";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    authService.login({ username, password });
    navigate(urls.root + urls.dashboard, { replace: true });
  };

  const logout = () => {
    // Implement logout logic here
    navigate(`${urls.auth}/${urls.login}`, { replace: true });
  };

  return { login, logout };
};
