"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { motion } from "motion/react";

// Hardcoded demo credentials for auto-login
const DEMO_CREDENTIALS = {
    email: "user11@example.com",
    password: "SecurePassword123!",
};

type LoginStatus = "loading" | "logging-in" | "success" | "error";

interface AutoLoginWrapperProps {
    children: React.ReactNode;
}

export default function AutoLoginWrapper({ children }: AutoLoginWrapperProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [loginStatus, setLoginStatus] = useState<LoginStatus>("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const performAutoLogin = async () => {
            // Always perform fresh auto-login with demo credentials
            // Clear any existing tokens first to ensure clean state
            localStorage.removeItem("token");
            localStorage.removeItem("token_type");

            setLoginStatus("logging-in");

            try {
                const { data, error, status } = await apiClient.post<{
                    message?: string;
                    access_token?: string;
                    token_type?: string;
                }>("/api/auth/signin", {
                    email: DEMO_CREDENTIALS.email,
                    password: DEMO_CREDENTIALS.password,
                }, { requiresAuth: false });

                if (status === 200 && data) {
                    const accessToken = data.access_token;
                    const tokenType = data.token_type || "bearer";

                    if (accessToken) {
                        // Store token in localStorage
                        localStorage.setItem("token", accessToken);
                        localStorage.setItem("token_type", tokenType);

                        setLoginStatus("success");

                        // Redirect to dashboard after successful login
                        setTimeout(() => {
                            router.push("/dashboard");
                        }, 800);
                    } else {
                        setLoginStatus("error");
                        setErrorMessage("No access token received");
                    }
                } else {
                    setLoginStatus("error");
                    setErrorMessage(error || "Auto-login failed");
                }
            } catch (err: unknown) {
                const errorMsg = err instanceof Error ? err.message : "An unknown error occurred";
                setLoginStatus("error");
                setErrorMessage(errorMsg);
            }
        };

        // Only auto-login on landing page, login page, or signup page
        // Dashboard already has AuthGuard which will handle its own auto-login
        if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
            performAutoLogin();
        } else {
            // For other routes (like dashboard), let them render normally
            // They will use AuthGuard for authentication
            setLoginStatus("success");
        }
    }, [pathname, router]);

    // Show loading screen while auto-login is in progress (for / and /login routes)
    if ((pathname === "/" || pathname === "/login" || pathname === "/signup") &&
        (loginStatus === "loading" || loginStatus === "logging-in" || loginStatus === "success")) {
        return <LoadingScreen status={loginStatus} />;
    }

    // Show error state if auto-login failed
    if (loginStatus === "error") {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm max-w-md"
                >
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-zinc-100 mb-2">Login Failed</h2>
                        <p className="text-zinc-400 text-sm">{errorMessage}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                    >
                        Try Again
                    </button>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}

// Beautiful loading screen component
function LoadingScreen({ status }: { status: LoginStatus }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.2, 0.4],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center gap-8"
            >
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse" />
                    <div className="relative bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-2xl p-6 border border-zinc-700/50 backdrop-blur-sm">
                        <svg
                            className="h-12 w-12 text-purple-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>
                    </div>
                </motion.div>

                {/* Brand name */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent"
                >
                    Rivalis
                </motion.h1>

                {/* Loading spinner */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col items-center gap-4"
                >
                    {/* Custom animated spinner */}
                    <div className="relative w-16 h-16">
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-purple-500/20"
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-400"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                        <motion.div
                            className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-500 border-l-blue-400"
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </div>

                    {/* Status text */}
                    <motion.div
                        key={status}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center gap-2"
                    >
                        {status === "loading" && (
                            <p className="text-zinc-400 text-sm font-medium">
                                Initializing...
                            </p>
                        )}
                        {status === "logging-in" && (
                            <p className="text-zinc-300 text-sm font-medium">
                                Signing you in...
                            </p>
                        )}
                        {status === "success" && (
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 text-green-400"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm font-medium">Welcome! Redirecting...</span>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "200px" }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="h-1 bg-zinc-800 rounded-full overflow-hidden"
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                            width: status === "success" ? "100%" :
                                status === "logging-in" ? "70%" : "20%"
                        }}
                        transition={{
                            duration: status === "success" ? 0.3 : 2,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
