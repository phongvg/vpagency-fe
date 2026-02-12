import { ConfirmProvider } from "@/app/providers/ConfirmProvider";
import { queryClient } from "@/configs/queryClient";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "react-hot-toast";

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLoading />
      <TooltipProvider delayDuration={200}>
        <ConfirmProvider>{children}</ConfirmProvider>
      </TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
