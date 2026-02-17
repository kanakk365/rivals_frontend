"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore, AuthUser } from "@/store/authStore";

// ===== Auth Context =====
interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===== Public Routes =====
// Routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup"];

// ===== Auth Provider Component =====
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout: storeLogout } = useAuthStore();

  // Wait for Zustand to rehydrate from storage
  useEffect(() => {
    // Use a microtask to avoid synchronous setState in effect body
    const frame = requestAnimationFrame(() => {
      setIsInitialized(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Route protection logic
  useEffect(() => {
    if (!isInitialized) return;

    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && !isPublicRoute) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }

    // Redirect authenticated users away from login page (unless SSO token)
    if (isAuthenticated && pathname === "/login") {
      const params = new URLSearchParams(window.location.search);
      if (!params.has("token")) {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, pathname, router, isInitialized]);

  // Logout handler — clears store + cookie + redirect
  const logout = () => {
    storeLogout();
    document.cookie =
      "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  // Don't render children until Zustand has rehydrated
  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading: !isInitialized,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ===== useAuth Hook =====
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
