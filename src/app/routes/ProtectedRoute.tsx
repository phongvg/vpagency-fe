import { urls } from "@/app/routes/route.constant";
import { AppLoading } from "@/shared/components/common/AppLoading";
import type { Role } from "@/shared/constants/role.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  permissions?: Role[];
}

export default function ProtectedRoute({ children, permissions }: ProtectedRouteProps) {
  const { isAuthenticated, loading, user } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return <AppLoading loading={loading} />;
  }

  if (!isAuthenticated) {
    return <Navigate to={`${urls.auth}/${urls.login}`} replace state={{ from: location }} />;
  }

  if (permissions && user && !permissions.some((permission) => user.roles.includes(permission))) {
    return <Navigate to={urls.forbidden} replace />;
  }

  return children;
}
