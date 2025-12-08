import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  tokenType: string;
  isAuthenticated: boolean;

  // Actions
  setToken: (token: string, tokenType?: string) => void;
  clearToken: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      tokenType: "Bearer",
      isAuthenticated: false,

      setToken: (token: string, tokenType: string = "Bearer") => {
        // Also store in localStorage for API client compatibility
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          localStorage.setItem("token_type", tokenType);
        }
        set({ token, tokenType, isAuthenticated: true });
      },

      clearToken: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("token_type");
        }
        set({ token: null, tokenType: "Bearer", isAuthenticated: false });
      },

      checkAuth: () => {
        const state = get();
        if (state.token) {
          return true;
        }
        // Also check localStorage as fallback
        if (typeof window !== "undefined") {
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            set({
              token: storedToken,
              tokenType: localStorage.getItem("token_type") || "Bearer",
              isAuthenticated: true,
            });
            return true;
          }
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        tokenType: state.tokenType,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
