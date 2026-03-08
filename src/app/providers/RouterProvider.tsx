import { appRoutes } from "@/app/routes/route.config";
import { processRoutes } from "@/app/routes/route.utils";
import { useMemo } from "react";
import { useRoutes } from "react-router-dom";

export const AppRouter = () => {
  // Tự động wrap các route với ProtectedRoute dựa trên roles
  const processedRoutes = useMemo(() => processRoutes(appRoutes), []);
  return useRoutes(processedRoutes);
};
