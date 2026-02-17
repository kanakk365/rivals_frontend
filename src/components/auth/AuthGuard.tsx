"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Auth guard component for protecting route layouts.
 * Uses the Zustand auth store (which syncs with localStorage + cookies).
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Small delay to allow Zustand rehydration
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        // Also check localStorage as fallback
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
      }
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
