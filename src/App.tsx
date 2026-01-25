import AppProvider from "@/app/providers/AppProvider";
import { AppRouter } from "@/app/providers/RouterProvider";
import { authService } from "@/auth/services/auth.service";
import { ACCESS_TOKEN } from "@/shared/constants/token.constant";
import { getStorageItem } from "@/shared/utils/storage.util";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  useEffect(() => {
    const token = getStorageItem<string | null>(ACCESS_TOKEN, null);

    if (token) {
      authService.getMe();
    }
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
