"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section
      className="py-32"
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden px-10 py-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(124,58,237,0.18) 0%, rgba(0,0,0,0) 70%), #0a0a14",
            border: "1px solid rgba(124,58,237,0.2)",
            boxShadow: "0 0 120px rgba(124,58,237,0.08) inset",
          }}
        >
          {/* Decorative top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(167,139,250,0.6), transparent)",
            }}
          />

          <div
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#a78bfa",
            }}
          >
            Start free today
          </div>

          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ready to outmaneuver
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              your competition?
            </span>
          </h2>

          <p
            className="text-lg mb-10 max-w-lg mx-auto"
            style={{ color: "#6b7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Join 500+ teams who use Rivalis to stay one step ahead. No credit
            card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <button
                className="group flex items-center gap-2.5 px-9 py-4 font-semibold text-white rounded-xl text-base transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  boxShadow: "0 0 50px rgba(124,58,237,0.4), 0 2px 12px rgba(0,0,0,0.5)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 70px rgba(124,58,237,0.6), 0 4px 16px rgba(0,0,0,0.5)"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 50px rgba(124,58,237,0.4), 0 2px 12px rgba(0,0,0,0.5)"
                }}
              >
                Create free account
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </Link>
            <Link href="/login">
              <button
                className="px-9 py-4 font-semibold text-sm transition-all duration-200 hover:text-white rounded-xl"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#6b7280",
                }}
              >
                Already have an account? Sign in →
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
