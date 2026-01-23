import { appRoutes } from "@/app/routes/route.config";
import { useRoutes } from "react-router-dom";

export const AppRouter = () => {
  return useRoutes(appRoutes);
};
