import type { User } from "@/modules/user/types/user.type";

export type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
};

export type AuthActions = {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
};

export type AuthStore = AuthState & AuthActions;
