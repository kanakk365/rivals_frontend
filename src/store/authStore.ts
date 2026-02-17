import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ===== Auth User Type =====
export interface AuthUser {
  token: string;
  id?: number;
  name: string;
  email: string;
  // Roles removed as per request
}

// ===== Auth State =====
interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: AuthUser) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

// ===== Custom Dual Storage (localStorage + Cookie) =====
const customStorage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
    // Also set a cookie for middleware access (7-day expiry)
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=604800; SameSite=Lax`;
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user: AuthUser) => {
        // Also store token in localStorage for backward compatibility with api-client
        if (typeof window !== "undefined") {
          localStorage.setItem("token", user.token);
          localStorage.setItem("token_type", "Bearer");
        }
        set({ user, isAuthenticated: true, error: null, isLoading: false });
      },

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setError: (error: string | null) => set({ error, isLoading: false }),

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("token_type");
          document.cookie =
            "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
      },

      checkAuth: () => {
        const state = get();
        if (state.user && state.isAuthenticated) {
          return true;
        }
        if (typeof window !== "undefined") {
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            return true;
          }
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => customStorage),
      version: 2, // Bump version to clear old state with roles
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      migrate: (persistedState, version) => {
        // Reset state if version is old (handling the schema change)
        if (version < 2) {
          return {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          };
        }
        return persistedState as AuthState;
      },
    },
  ),
);
