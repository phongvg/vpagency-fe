import type { AuthStore } from "@/shared/stores/auth/auth.type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      loading: true,
      user: null,

      setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      setLoading: (loading: boolean) => set({ loading }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "Auth Store",
    }
  )
);
