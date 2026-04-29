"use client"

import { motion } from "motion/react"
import {
  Instagram,
  Globe,
  BarChart3,
  BrainCircuit,
  Bell,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    icon: Instagram,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.2)",
    label: "Social Media",
    title: "Full social coverage",
    description:
      "Monitor follower growth, engagement rates, post cadence, and content strategy across Instagram, X, LinkedIn, and YouTube — all in one feed.",
  },
  {
    icon: Globe,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.2)",
    label: "Website",
    title: "Website intelligence",
    description:
      "Track traffic trends, SEO rank shifts, page updates, and tech-stack changes. Know the moment a competitor relaunches or goes viral.",
  },
  {
    icon: BarChart3,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.2)",
    label: "Pricing",
    title: "Pricing & promotions",
    description:
      "Catch every pricing tweak, discount, or packaging change before your customers do. Compare tiers side-by-side over time.",
  },
  {
    icon: BrainCircuit,
    color: "#34d399",
    glow: "rgba(52,211,153,0.2)",
    label: "Sentiment",
    title: "Brand sentiment",
    description:
      "AI scores customer perception across reviews, social mentions, and news. Understand how the market feels about every player.",
  },
  {
    icon: TrendingUp,
    color: "#fb923c",
    glow: "rgba(251,146,60,0.2)",
    label: "Benchmarking",
    title: "Competitive benchmarks",
    description:
      "Stack your metrics against the field. Instantly see where you lead, where you lag, and which gaps are closing fastest.",
  },
  {
    icon: Bell,
    color: "#facc15",
    glow: "rgba(250,204,21,0.2)",
    label: "Alerts",
    title: "Real-time alerts",
    description:
      "Get notified the moment something changes — a competitor drops their price, a viral post lands, or a new product page goes live.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32" style={{ background: "#050508" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.25)",
              color: "#a78bfa",
            }}
          >
            What we track
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Everything your rivals do.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 60%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              All in one place.
            </span>
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "#6b7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Six intelligence streams, automatically collected and surfaced so your team
            can focus on strategy, not data-gathering.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
              >
                <div
                  className="group relative h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = "rgba(255,255,255,0.04)"
                    el.style.border = `1px solid ${feature.color}30`
                    el.style.boxShadow = `0 0 40px ${feature.glow}`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = "rgba(255,255,255,0.025)"
                    el.style.border = "1px solid rgba(255,255,255,0.06)"
                    el.style.boxShadow = "none"
                  }}
                >
                  {/* Icon + badge row */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${feature.glow}`,
                        border: `1px solid ${feature.color}30`,
                      }}
                    >
                      <Icon size={20} style={{ color: feature.color }} />
                    </div>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "#6b7280",
                      }}
                    >
                      {feature.label}
                    </span>
                  </div>

                  {/* Text */}
                  <h3
                    className="text-lg font-semibold text-white mb-2.5"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6b7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
