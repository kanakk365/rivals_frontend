"use client"

import { motion } from "motion/react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Rivalis changed how we approach competitor research. What used to take a full day of manual digging now shows up in our dashboard automatically. We caught a pricing change from a key rival 3 hours after it happened — before any of our customers noticed.",
    name: "Sarah Chen",
    role: "Head of Product",
    company: "Meridian SaaS",
    avatar: "SC",
    accentColor: "#a78bfa",
  },
  {
    quote:
      "The sentiment analysis is genuinely impressive. We can see exactly where competitors are winning and losing customer trust, and that's shaped our entire Q3 messaging strategy. Worth every penny for the social monitoring alone.",
    name: "Marcus Webb",
    role: "VP Marketing",
    company: "Forge Analytics",
    avatar: "MW",
    accentColor: "#38bdf8",
  },
  {
    quote:
      "I was skeptical at first, but the website change tracking is uncanny. We found out a competitor had quietly launched a new enterprise tier — Rivalis flagged it within hours. That's the kind of intel that changes how you allocate sales resources.",
    name: "Priya Nair",
    role: "Director of Strategy",
    company: "Lucent Ventures",
    avatar: "PN",
    accentColor: "#34d399",
  },
]

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-32"
      style={{
        background: "#050508",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.25)",
              color: "#a78bfa",
            }}
          >
            What teams say
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Trusted by teams who
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 60%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              play to win.
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            >
              <div
                className="h-full rounded-2xl p-7 flex flex-col gap-5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Quote icon */}
                <Quote size={28} style={{ color: t.accentColor, opacity: 0.6 }} />

                {/* Quote text */}
                <p
                  className="text-sm leading-[1.8] flex-1"
                  style={{ color: "#9ca3af", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${t.accentColor}40, ${t.accentColor}20)`,
                      border: `1px solid ${t.accentColor}30`,
                      color: t.accentColor,
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "#6b7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
