import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Dream } from "../types/dream";

interface DreamState {
  dreams: Dream[];
  addDream: (dream: Dream) => void;
  updateDream: (id: string, updated: Partial<Dream>) => void;
  removeDream: (id: string) => void;
}

export const useDreamStore = create<DreamState>()(
  persist(
    (set) => ({
      dreams: [],
      addDream: (dream) =>
        set((state) => ({
          dreams: [...state.dreams, dream],
        })),
      updateDream: (id, updated) =>
        set((state) => ({
          dreams: state.dreams.map((d) =>
            d.id === id ? { ...d, ...updated } : d
          ),
        })),
      removeDream: (id) =>
        set((state) => ({
          dreams: state.dreams.filter((d) => d.id !== id),
        })),
    }),
    {
      name: "mongmi-dreams", // 로컬스토리지에 저장될 key
    }
  )
);
