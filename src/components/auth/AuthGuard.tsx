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
        // Check if user is authenticated by looking for token in localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            // No token found, redirect to login page
            router.push("/login");
        } else {
            // Token exists, user is authenticated
            setIsAuthenticated(true);
        }
    }, [router]);

    // Show loading state while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
                    <p className="text-sm text-muted-foreground">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, don't render children (redirect is already happening)
    if (!isAuthenticated) {
        return null;
    }

    // User is authenticated, render children
    return <>{children}</>;
}
