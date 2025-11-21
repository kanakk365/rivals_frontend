"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { TrendingUp, BarChart3, Globe, Instagram, Users, Menu, X } from "lucide-react"
import { NavBar } from "@/components/Landing/Tubelight"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", url: "/dashboard", icon: BarChart3 },
    { name: "Features", url: "#features", icon: Instagram },
    { name: "How it works", url: "#how-it-works", icon: Globe },
    { name: "Get Started", url: "#lamp-demo", icon: Users },
    // { name: "Notifications", url: "/dashboard/notifications", icon: Bell },
    // { name: "Settings", url: "/dashboard/settings", icon: Settings },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled ? "py-3 bg-black/80 backdrop-blur-lg shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-blue-600 rounded-full blur-sm opacity-70"></div>
              <div className="relative bg-black rounded-full p-2">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              CompetitorHUB
            </span>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <NavBar items={navItems} isFixed={false} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-purple-500/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex items-center gap-3"
          >
            <Link href="/login">
              <button
                className="px-4 py-2 border border-purple-500/20 text-white hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 rounded-lg"
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 rounded-lg text-white font-medium">
                Sign Up
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 mt-3"
          >
            <div className="container mx-auto py-4 px-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon size={18} className="text-purple-400" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
                <div className="pt-4 flex flex-col gap-2 border-t border-gray-800 mt-2">
                  <Link href="/login" className="w-full">
                    <button
                      className="w-full px-4 py-2 border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 rounded-lg transition-all duration-300"
                    >
                      Login
                    </button>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <button className="w-full px-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium transition-all duration-300">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
