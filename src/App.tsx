import AppProvider from "@/app/providers/AppProvider";
import { AppRouter } from "@/app/providers/RouterProvider";
import { authService } from "@/auth/services/auth.service";
import { useAuthInit } from "@/auth/useAuthInit";
import { ACCESS_TOKEN, EXPIRES_AT } from "@/shared/constants/auth.constant";
import { getStorageItem } from "@/shared/utils/storage.util";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  useAuthInit();

  useEffect(() => {
    const token = getStorageItem<string | null>(ACCESS_TOKEN, null);
    const expiresAt = Number(getStorageItem<string | null>(EXPIRES_AT, null));

    if (token && expiresAt && expiresAt > Date.now()) {
      authService.getMe();
    }

    //  else if (token && (!expiresAt || expiresAt <= Date.now())) {
    //   authService.logout();
    // }
  }, []);

  return (
    <BrowserRouter>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
