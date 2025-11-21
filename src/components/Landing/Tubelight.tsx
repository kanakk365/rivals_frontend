"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  isFixed?: boolean
}

export function NavBar({ items, className, isFixed = true }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determine which tab should have the light effect
  const lightPosition = hoveredTab || activeTab

  const baseClass = isFixed
    ? "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6"
    : "relative flex justify-center";

  return (
    <div className={cn(baseClass, className)}>
      <div className="flex items-center gap-3 bg-gray-900/70 border border-purple-500/20 backdrop-blur-xl py-2 px-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(120,50,255,0.1)] transition-all duration-300">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          const isLit = lightPosition === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-4 py-2.5 rounded-full transition-all duration-300",
                "text-gray-300 hover:text-purple-400",
                isActive ? "text-white" : "",
              )}
            >
              <span className="hidden md:block relative z-10">{item.name}</span>
              <span className="md:hidden relative z-10">
                <Icon size={20} strokeWidth={2} className={isActive ? "text-white" : ""} />
              </span>
              {isLit && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full -z-0"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-full">
                    <div className="absolute w-16 h-8 bg-purple-500/20 rounded-full blur-md -top-3 -left-3" />
                    <div className="absolute w-10 h-8 bg-blue-500/20 rounded-full blur-md -top-2 left-0" />
                    <div className="absolute w-6 h-6 bg-purple-400/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm" />
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
