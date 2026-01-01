"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, ChevronRight, User } from "lucide-react"
import Profile01 from "./profile"
import Link from "next/link"
import { ThemeToggle } from "../utils/theme-toggle"

interface BreadcrumbItem {
  label: string
  href?: string
}

// Avatar fallback component that shows initials
function AvatarFallback({ name, size = "sm" }: { name?: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-7 h-7 sm:w-8 sm:h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-[72px] h-[72px] text-xl"
  }

  const initial = name ? name.charAt(0).toUpperCase() : <User className="w-4 h-4" />

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold ring-2 ring-border cursor-pointer`}>
      {initial}
    </div>
  )
}

export default function TopNav() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Destination KP", href: "#" },
    { label: "dashboard", href: "#" },
  ]

  // This would typically come from user context/auth state
  const userName = "User"

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-background border-b border-border h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-accent rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        </button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <AvatarFallback name={userName} size="sm" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <Profile01 />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

