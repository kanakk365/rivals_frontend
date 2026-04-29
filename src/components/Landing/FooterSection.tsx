"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"

const COLUMNS = [
  {
    heading: "Product",
    items: [
      { label: "Features",     href: "#features"     },
      { label: "How it works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Sign Up",   href: "/signup"    },
      { label: "Login",     href: "/login"     },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
]

export default function FooterSection() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#07060c] border-t border-violet-400/10 px-6 lg:px-12 pt-20 pb-10">

      {/* faint top gradient line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(167,139,250,0.2) 50%, transparent 100%)",
        }}
      />

      {/* ambient bloom behind the giant wordmark */}
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[1100px] h-[400px] pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(88,28,180,0.15) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-slate-500 sm:flex-row md:px-8">

        {/* ── Brand block ── */}
        <div>
          <Link
            href="/"
            className="relative z-20 mr-4 flex items-center gap-2 px-2 py-1 text-sm font-normal text-white"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 opacity-50 blur-sm" />
              <div className="relative rounded-full p-1.5 bg-[#0a0a12] border border-violet-500/40">
                <TrendingUp size={14} className="text-violet-400" />
              </div>
            </div>
            <span
              className="font-medium text-white text-[15px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Rivalis
            </span>
          </Link>
          <p className="mt-2 ml-2 text-[12.5px] text-slate-500/80">
            © copyright Rivalis {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>

        {/* ── Link columns ── */}
        <div className="mt-10 grid grid-cols-2 items-start gap-12 sm:mt-0">
          {COLUMNS.map(({ heading, items }) => (
            <div key={heading} className="flex w-full flex-col justify-center space-y-4">
              <p className="font-body font-bold text-[13px] text-slate-200/90 transition-colors">
                {heading}
              </p>
              <ul className="list-none space-y-3 text-slate-400/70">
                {items.map(({ label, href }) => (
                  <li key={label} className="list-none">
                    <Link
                      href={href}
                      className="font-body text-[13px] hover:text-violet-300 transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* ── Giant wordmark ── */}
      <p
        className="relative inset-x-0 mt-20 bg-clip-text text-center font-mono font-bold text-transparent select-none leading-none tracking-[-0.06em] uppercase text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #1a1530 0%, #2a1f55 45%, #3a2780 100%)",
          WebkitBackgroundClip: "text",
        }}
      >
        Rivalis
      </p>
    </footer>
  )
}
