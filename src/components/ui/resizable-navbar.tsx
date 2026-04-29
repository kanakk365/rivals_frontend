"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        boxShadow: visible
          ? "0 0 0 1px rgba(124,58,237,0.15), 0 8px 32px rgba(0,0,0,0.4)"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 12 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "800px" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-6 py-3 lg:flex",
        visible
          ? "bg-[rgba(5,5,8,0.90)] border border-violet-500/20"
          : "bg-transparent",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/5"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        boxShadow: visible
          ? "0 0 0 1px rgba(124,58,237,0.15), 0 8px 32px rgba(0,0,0,0.4)"
          : "none",
        width: visible ? "92%" : "100%",
        paddingRight: visible ? "16px" : "0px",
        paddingLeft: visible ? "16px" : "0px",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 12 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between px-4 py-3 lg:hidden",
        visible
          ? "bg-[rgba(5,5,8,0.90)] border border-violet-500/20"
          : "bg-transparent",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl border border-violet-500/15 bg-[rgba(5,5,8,0.97)] px-6 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.5)]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-gray-300 cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-gray-300 cursor-pointer" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center gap-2.5 group"
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 opacity-60 group-hover:opacity-100 transition-opacity blur-sm" />
        <div className="relative rounded-full p-1.5 bg-[#0a0a12] border border-violet-500/40">
          <TrendingUp size={16} className="text-violet-400" />
        </div>
      </div>
      <span
        className="text-lg font-bold tracking-tight text-white"
        style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-0.02em" }}
      >
        Rivalis
      </span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  onClick?: () => void;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg text-sm font-semibold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles: Record<string, string> = {
    primary:
      "text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]",
    secondary:
      "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
    dark: "bg-white/10 text-white border border-white/10 hover:bg-white/15",
    gradient:
      "bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.2)_inset]",
  };

  const primaryStyle =
    variant === "primary"
      ? {
          background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
        }
      : {};

  return React.createElement(
    Tag,
    {
      href: href || undefined,
      className: cn(baseStyles, variantStyles[variant], className),
      style: primaryStyle,
      ...props,
    },
    children,
  );
};
