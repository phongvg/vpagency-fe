import { urls } from "@/app/routes/route.constant";
import AppLoading from "@/shared/components/common/AppLoading";
import { ACCESS_TOKEN } from "@/shared/constants/auth.constant";
import type { Role } from "@/shared/constants/role.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { getStorageItem } from "@/shared/utils/storage.util";
import { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  permissions?: Role[];
}

export default function ProtectedRoute({ children, permissions }: ProtectedRouteProps) {
  const { isAuthenticated, loading, user } = useAuthStore();
  const location = useLocation();
  const token = getStorageItem<string | null>(ACCESS_TOKEN, null);

  if (loading) {
    return <AppLoading loading={loading} />;
  }

  if (!isAuthenticated && !token) {
    return <Navigate to={`${urls.auth}/${urls.login}`} replace state={{ from: location }} />;
  }

  if (permissions && user && !permissions.some((permission) => user.roles.includes(permission))) {
    return <Navigate to={urls.forbidden} replace />;
  }

  return children;
}
