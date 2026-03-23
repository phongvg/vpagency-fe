import { create } from "zustand";

interface RankingPopupStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useRankingPopupStore = create<RankingPopupStore>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
