import { axios } from "@/lib/axios";
import { create } from "zustand";

type AuthStore = {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  checkAdminStatus: () => Promise<void>;
  reset: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get("/admin/check");

      set({ isAdmin: res.data.admin });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set({ isAdmin: false, isLoading: false, error: null }),
}));
