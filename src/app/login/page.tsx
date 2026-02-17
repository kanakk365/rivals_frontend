"use client";

import type * as React from "react";
import { Suspense } from "react";

import { ChevronLeft, UserPlus, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { ForceDarkMode } from "@/components/providers/force-dark-mode";
import { useAuthStore } from "@/store/authStore";
import { ssoLogin, normalLogin, saveAuthUser } from "@/lib/sso-auth";

// ===== Main Login Page =====
function LoginPageContent() {
  return (
    <ForceDarkMode>
      <div className="bg-white dark:bg-zinc-950 py-20 text-zinc-800 dark:text-zinc-200 selection:bg-zinc-300 dark:selection:bg-zinc-600">
        <BackButton />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, ease: "easeInOut" }}
          className="relative z-10 mx-auto w-full max-w-xl p-4"
        >
          <Logo />
          <Header />
          <SocialButtons />
          <Divider />
          <LoginForm />
          <TermsAndConditions />
        </motion.div>

        <BackgroundDecoration />
      </div>
    </ForceDarkMode>
  );
}

// Wrap with Suspense for useSearchParams
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-zinc-950">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent" />
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}

// ===== Sub Components =====

const BackButton: React.FC = () => (
  <Link
    href="/"
    className="absolute left-4 top-4 z-20 flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
  >
    <ChevronLeft size={16} />
    <span>Go back</span>
  </Link>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isLoading,
  ...props
}) => (
  <button
    className={`rounded-md bg-gradient-to-br from-purple-600 to-blue-600 px-4 py-2 text-lg text-zinc-50 
    ring-2 ring-purple-500/50 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 
    transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-purple-500/70 ${className}
    ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
    disabled={isLoading}
    {...props}
  >
    {isLoading ? (
      <span className="flex items-center justify-center gap-2">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </span>
    ) : (
      children
    )}
  </button>
);

const Logo: React.FC = () => (
  <div className="mb-6 flex justify-center">
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-sm opacity-70"></div>
      <div className="relative bg-white dark:bg-zinc-950 rounded-full p-2">
        <svg
          className="h-6 w-6 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      </div>
    </div>
    <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
      CompetitorHUB
    </span>
  </div>
);

const Header: React.FC = () => (
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-semibold">Sign in to your account</h1>
    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
      Don&lsquo;t have an account?{" "}
      <Link
        href="/signup"
        className="text-purple-600 dark:text-purple-400 hover:underline"
      >
        Create one.
      </Link>
    </p>
  </div>
);

const SocialButtons: React.FC = () => (
  <div className="mb-6 space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <SocialButton icon={<GoogleIcon />}>Google</SocialButton>
      <Link href="/signup" className="w-full">
        <SocialButton icon={<UserPlus size={20} />}>
          Create account
        </SocialButton>
      </Link>
    </div>
  </div>
);

const GoogleIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const SocialButton: React.FC<{
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}> = ({ icon, fullWidth, children }) => (
  <button
    className={`relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-md 
    border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 
    px-4 py-2 font-semibold text-zinc-800 dark:text-zinc-200 transition-all duration-500
    before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-zinc-800 dark:before:bg-zinc-200 before:transition-transform before:duration-1000 before:content-[""]
    hover:scale-105 hover:text-zinc-100 dark:hover:text-zinc-900 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95
    ${fullWidth ? "col-span-2" : ""} w-full`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

const Divider: React.FC = () => (
  <div className="my-6 flex items-center gap-3">
    <div className="h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />
    <span className="text-zinc-500 dark:text-zinc-400">OR</span>
    <div className="h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />
  </div>
);

// ===== Login Form (Handles both SSO + Normal Login) =====
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSsoLoading, setIsSsoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ssoProcessedRef = useRef(false); // Prevent double-processing

  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, logout } = useAuthStore();

  // ===== SSO: Check for token in URL on mount =====
  useEffect(() => {
    const token = searchParams.get("token");
    if (token && !ssoProcessedRef.current) {
      ssoProcessedRef.current = true;

      // If already authenticated, logout first to re-auth via SSO
      if (isAuthenticated) {
        logout();
      }

      handleSsoLogin(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // ===== Redirect if already authenticated (without SSO token) =====
  useEffect(() => {
    if (isAuthenticated && !searchParams.get("token")) {
      const redirectPath = searchParams.get("redirect") || "/dashboard";
      router.push(redirectPath);
    }
  }, [isAuthenticated, router, searchParams]);

  // ===== SSO Login Handler =====
  const handleSsoLogin = async (token: string) => {
    setIsSsoLoading(true);
    setError(null);

    try {
      const user = await ssoLogin(token);
      saveAuthUser(user);
      toast.success("SSO authentication successful!");

      // Use window.location.href for full page refresh to avoid React hydration issues
      const redirectPath = searchParams.get("redirect") || "/dashboard";
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 500);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "SSO authentication failed";
      setError(errorMsg);
      toast.error("SSO authentication failed. Please login manually.");
      setIsSsoLoading(false);
      ssoProcessedRef.current = false;
    }
  };

  // ===== Normal Login Handler =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const user = await normalLogin(email, password);
      saveAuthUser(user);
      toast.success("Sign in successful!");

      const redirectPath = searchParams.get("redirect") || "/dashboard";
      setTimeout(() => {
        router.push(redirectPath);
      }, 800);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Invalid credentials";
      setError(errorMsg);
      toast.error(errorMsg || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  // ===== SSO Loading State =====
  if (isSsoLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-400 animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-zinc-200 font-medium">Authenticating via SSO...</p>
          <p className="text-zinc-500 text-sm">
            Please wait while we verify your identity
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="mb-3">
        <label
          htmlFor="email-input"
          className="mb-1.5 block text-zinc-500 dark:text-zinc-400"
        >
          Email
        </label>
        <input
          id="email-input"
          type="email"
          placeholder="your.email@provider.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
          bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
          placeholder-zinc-400 dark:placeholder-zinc-500 
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-purple-700"
          required
        />
      </div>

      <div className="mb-6">
        <div className="mb-1.5 flex items-end justify-between">
          <label
            htmlFor="password-input"
            className="block text-zinc-500 dark:text-zinc-400"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            Forgot?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password-input"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
            bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200
            placeholder-zinc-400 dark:placeholder-zinc-500 pr-10
            ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-purple-700"
            required
            minLength={8}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Sign in
      </Button>
    </form>
  );
};

const TermsAndConditions: React.FC = () => (
  <p className="mt-9 text-xs text-zinc-500 dark:text-zinc-400">
    By signing in, you agree to our{" "}
    <Link
      href="/terms"
      className="text-purple-600 dark:text-purple-400 hover:underline"
    >
      Terms & Conditions
    </Link>{" "}
    and{" "}
    <Link
      href="/privacy"
      className="text-purple-600 dark:text-purple-400 hover:underline"
    >
      Privacy Policy.
    </Link>
  </p>
);

const BackgroundDecoration: React.FC = () => {
  return (
    <div
      className="absolute right-0 top-0 z-0 size-[50vw]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' strokeWidth='2' stroke='rgb(147, 51, 234, 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(100% 100% at 100% 0%, rgba(9,9,11,0), rgba(9,9,11,1))",
        }}
      />
    </div>
  );
};
