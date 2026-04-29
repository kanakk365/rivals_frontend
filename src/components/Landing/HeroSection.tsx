"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight, Play } from "lucide-react"

const GlobeComponent = dynamic(() => import("./GlobeComponent"), { ssr: false })

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#07060c]">
      {/* ═══════════════ BACKGROUND LAYERS ═══════════════ */}

      {/* Hero-wide violet radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 75% 45%, rgba(124, 58, 237, 0.18) 0%, rgba(88, 28, 180, 0.06) 35%, transparent 70%)",
        }}
      />

      {/* Left-side soft ambient bloom */}
      <div
        className="absolute top-[10%] -left-[10%] w-1/2 h-3/5 pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #07060c 0%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.35 0 0 0 0 0.95 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(167,139,250,0.3) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 min-h-screen grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-8 items-center py-20">

        <div className="flex flex-col max-w-[760px]">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-normal text-[clamp(2.5rem,5.5vw,4.6rem)] leading-[1.08] tracking-[-0.02em] text-violet-50 mb-7"
          >
            Know your{" "}
            <span
              className="italic bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 40%, #a78bfa 100%)",
              }}
            >
              rivals.
            </span>
            <br />
            Master every{" "}
            <span
              className="italic bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 40%, #a78bfa 100%)",
              }}
            >
              market.
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="font-body text-[16px] leading-[1.65] text-slate-300/55 mb-10 max-w-[520px]"
          >
            Rivalis tracks every competitor signal — social growth, website
            changes, pricing shifts, and brand sentiment — in real time,
            across every market.{" "}
            <span className="font-serif italic text-[18px] text-violet-100/85">
              Your team moves first.
            </span>
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-12"
          >
            <Link href="/signup">
              <button
                className="group font-body relative flex items-center gap-2.5 px-7 py-2.5 cursor-pointer rounded-full text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 60%, #6d28d9 100%)",
                  boxShadow:
                    "0 0 0 1px rgba(167,139,250,0.35) inset, 0 10px 40px -10px rgba(124,58,237,0.65), 0 2px 8px rgba(0,0,0,0.5)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 1px rgba(167,139,250,0.5) inset, 0 14px 55px -10px rgba(124,58,237,0.85), 0 2px 8px rgba(0,0,0,0.5)"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 1px rgba(167,139,250,0.35) inset, 0 10px 40px -10px rgba(124,58,237,0.65), 0 2px 8px rgba(0,0,0,0.5)"
                }}
              >
                Get Started
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </Link>

            <Link href="/login">
              <button className="group font-body flex items-center gap-2 px-5 py-2.5 cursor-pointer rounded-full text-[15px] font-medium text-violet-100/85 transition-all duration-200">
                <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.06] border border-white/10 transition-colors duration-200 group-hover:bg-white/10">
                  <Play size={10} className="text-violet-300 ml-0.5" fill="currentColor" />
                </span>
                Watch demo
              </button>
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex items-center gap-4"
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {[
                "linear-gradient(135deg,#f472b6,#8b5cf6)",
                "linear-gradient(135deg,#60a5fa,#a78bfa)",
                "linear-gradient(135deg,#34d399,#60a5fa)",
                "linear-gradient(135deg,#fbbf24,#f472b6)",
              ].map((bg, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#07060c] shadow-md"
                  style={{ background: bg }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-body text-sm font-medium text-violet-100/85">
                <span className="font-serif italic text-white text-[17px]">500+</span>{" "}
                teams already moving faster
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center w-full"
        >

          <div
            className="absolute -inset-[5%] rounded-full pointer-events-none blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)",
            }}
          />

          <GlobeComponent className="w-full max-w-[560px]" />
        </motion.div>
      </div>
    </section>
  )
}
