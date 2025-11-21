"use client";

import type * as React from "react";

import { ChevronLeft, UserPlus, Eye, EyeOff } from "lucide-react";

import { motion } from "motion/react";

import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { ForceDarkMode } from "@/components/providers/force-dark-mode";

const GridAuth: React.FC = () => {
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

          <SignupForm />

          <TermsAndConditions />
        </motion.div>

        <BackgroundDecoration />
      </div>
    </ForceDarkMode>
  );
};

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
    <h1 className="text-2xl font-semibold">Create your account</h1>

    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
      Already have an account?{" "}
      <Link
        href="/login"
        className="text-purple-600 dark:text-purple-400 hover:underline"
      >
        Sign in.
      </Link>
    </p>
  </div>
);

const SocialButtons: React.FC = () => (
  <div className="mb-6 space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <SocialButton icon={<GoogleIcon />}>Google</SocialButton>

      <Link href="/login" className="w-full">
        <SocialButton icon={<UserPlus size={20} />}>Sign in</SocialButton>
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

const SignupForm: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!firstname || !lastname || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://auth.oneplace.io/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
          auth: "manual",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Handle successful sign up
      toast.success("Sign up successful!");
      router.push("/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage || "An error occurred during sign up");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="firstname-input"
            className="mb-1.5 block text-zinc-500 dark:text-zinc-400"
          >
            First name
          </label>
          <input
            id="firstname-input"
            type="text"
            placeholder="John"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 

          bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200

          placeholder-zinc-400 dark:placeholder-zinc-500 

          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-purple-700"
            required
          />
        </div>

        <div>
          <label
            htmlFor="lastname-input"
            className="mb-1.5 block text-zinc-500 dark:text-zinc-400"
          >
            Last name
          </label>
          <input
            id="lastname-input"
            type="text"
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 

          bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200

          placeholder-zinc-400 dark:placeholder-zinc-500 

          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-purple-700"
            required
          />
        </div>
      </div>

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
        <label
          htmlFor="password-input"
          className="mb-1.5 block text-zinc-500 dark:text-zinc-400"
        >
          Password
        </label>
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

      <div className="mb-6 flex items-center gap-2">
        <input
          id="terms-checkbox"
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-purple-600 focus:ring-purple-500 dark:bg-zinc-900"
        />
        <label
          htmlFor="terms-checkbox"
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          I agree to the{" "}
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
            Privacy Policy
          </Link>
        </label>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Sign up
      </Button>
    </form>
  );
};

const TermsAndConditions: React.FC = () => (
  <p className="mt-9 text-xs text-zinc-500 dark:text-zinc-400">
    By signing up, you agree to our{" "}
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

export default GridAuth;
