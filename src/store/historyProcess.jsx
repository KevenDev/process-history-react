import { create } from "zustand";

export const useHistoryProcess = create((set) => ({
  history: {},
  updateHistory: (history) => set(() => ({ history: history })),
}));

