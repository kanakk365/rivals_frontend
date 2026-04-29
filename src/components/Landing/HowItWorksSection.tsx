"use client"

import { motion } from "motion/react"
import { PlusCircle, Cpu, Lightbulb } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: PlusCircle,
    title: "Add your competitors",
    description:
      "Just enter a domain name. Rivalis automatically discovers brand profiles, social accounts, and data sources — no manual setup required.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "We track everything",
    description:
      "Our AI continuously monitors websites, social channels, review sites, and news — surfacing changes and signals 24 hours a day.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Get actionable insights",
    description:
      "Dashboards, trend charts, and smart alerts translate raw data into decisions. Know what changed, why it matters, and what to do next.",
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-32"
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
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
            Getting started
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Up and running
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 60%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in minutes.
            </span>
          </h2>
          <p
            className="text-lg max-w-lg mx-auto"
            style={{ color: "#6b7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            No integrations to configure, no data pipelines to manage. Just enter
            a domain and go.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px z-0"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(124,58,237,0.3) 20%, rgba(124,58,237,0.3) 80%, transparent)",
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div
                  className="w-[104px] h-[104px] rounded-full flex items-center justify-center mb-6 relative"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 40%, rgba(124,58,237,0.18), rgba(0,0,0,0.8))",
                    border: "1px solid rgba(124,58,237,0.25)",
                    boxShadow: "0 0 40px rgba(124,58,237,0.1)",
                  }}
                >
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                      color: "#fff",
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {step.number.slice(1)}
                  </div>
                  <Icon size={36} className="text-violet-400" />
                </div>

                <h3
                  className="text-xl font-semibold text-white mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-[260px]"
                  style={{ color: "#6b7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
