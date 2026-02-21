import { urls } from "@/app/routes/route.constant";
import { useAuth } from "@/auth/useAuth";
import AppLoading from "@/shared/components/common/AppLoading";
import { REFRESH_TOKEN } from "@/shared/constants/auth.constant";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginTelegramPage() {
  const navigate = useNavigate();
  const { loginTelegram, isLoggingInTelegram } = useAuth();
  const code = useQueryParam("code");

  useEffect(() => {
    Cookies.remove(REFRESH_TOKEN);
    localStorage.clear();

    if (!code) {
      navigate(`${urls.auth}/${urls.login}`);
      return;
    }

    loginTelegram(code);
  }, [code, navigate]);

  if (isLoggingInTelegram) return <AppLoading loading={isLoggingInTelegram} />;

  return null;
}
