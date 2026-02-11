import AppProvider from "@/app/providers/AppProvider";
import { AppRouter } from "@/app/providers/RouterProvider";
import { authService } from "@/auth/services/auth.service";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  useEffect(() => {
    authService.getMe();
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
