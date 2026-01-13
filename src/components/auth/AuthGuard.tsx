"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Just check if token exists - AutoLoginWrapper already handles the login
        const token = localStorage.getItem("token");

        if (token) {
            // Token exists (set by AutoLoginWrapper), user is authenticated
            setIsAuthenticated(true);
        } else {
            // No token - this shouldn't happen if AutoLoginWrapper is working
            // but redirect to home just in case (which will trigger auto-login)
            router.push("/");
        }
    }, [router]);

    // While checking, render nothing (prevents flash)
    if (isAuthenticated === null) {
        return null;
    }

    // If not authenticated, don't render (redirect is happening)
    if (!isAuthenticated) {
        return null;
    }

    // User is authenticated, render children
    return <>{children}</>;
}


