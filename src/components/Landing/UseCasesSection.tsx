"use client"

import { motion } from "motion/react"
import { Package, TrendingUp, Megaphone, Globe, LineChart, Zap } from "lucide-react"

const USE_CASES = [
  {
    Icon: Package,
    color: "text-cyan-400",
    iconBg: "bg-cyan-400/10 border border-cyan-400/20",
    title: "Product Teams",
    description:
      "Get alerted the moment a rival ships a new feature, changes their roadmap, or updates their docs — before it reaches your users.",
  },
  {
    Icon: TrendingUp,
    color: "text-emerald-400",
    iconBg: "bg-emerald-400/10 border border-emerald-400/20",
    title: "Sales Teams",
    description:
      "Live pricing intel and auto-generated battle cards so reps walk into every deal knowing exactly how to position against competitors.",
  },
  {
    Icon: Megaphone,
    color: "text-pink-400",
    iconBg: "bg-pink-400/10 border border-pink-400/20",
    title: "Marketing Teams",
    description:
      "Track competitor ad creative, social momentum, and messaging shifts so your campaigns always stay one step ahead.",
  },
  {
    Icon: Globe,
    color: "text-violet-400",
    iconBg: "bg-violet-400/10 border border-violet-400/20",
    title: "Founders & Execs",
    description:
      "A bird's-eye view of the full competitive landscape — funding rounds, headcount signals, and strategic moves — in one place.",
  },
  {
    Icon: LineChart,
    color: "text-amber-400",
    iconBg: "bg-amber-400/10 border border-amber-400/20",
    title: "Investor Relations",
    description:
      "Benchmark portfolio companies against rivals and surface growth signals, market-share shifts, and competitive risks in real time.",
  },
  {
    Icon: Zap,
    color: "text-blue-400",
    iconBg: "bg-blue-400/10 border border-blue-400/20",
    title: "Startup Teams",
    description:
      "Find gaps competitors haven't filled yet and identify weak spots in their offering before established players close them.",
  },
]

export default function UseCasesSection() {
  return (
    <section className="relative w-full bg-[#07060c] py-24 px-6 lg:px-12 overflow-hidden">
      {/* subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(88,28,180,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/20 bg-violet-500/10 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span className="text-[11px] font-semibold text-violet-300 tracking-widest uppercase">
            Use Cases
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-serif font-normal text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.02em] text-violet-50 text-center mb-5"
        >
          Built for every team that{" "}
          <span
            className="italic bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 40%, #a78bfa 100%)",
            }}
          >
            tracks rivals.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="font-body text-[16px] text-slate-300/50 max-w-[480px] text-center leading-relaxed mb-14"
        >
          Whether you ship product, close deals, or set strategy — Rivalis fits
          into your workflow and surfaces the signals that matter to you.
        </motion.p>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
          {USE_CASES.map(({ Icon, color, iconBg, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="relative group"
            >
              {/* grid pattern layer — only on hover */}
              <div
                className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none overflow-hidden"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(315deg, rgba(139,92,246,0.12) 0, rgba(139,92,246,0.12) 1px, transparent 0, transparent 50%)",
                  backgroundSize: "10px 10px",
                }}
              />

              <div className="relative z-10 flex flex-col gap-4 rounded-2xl border border-violet-400/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:bg-white/[0.055] hover:border-violet-400/20 h-full">
                {/* icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                  <Icon size={18} className={color} />
                </div>

                {/* text */}
                <div>
                  <h3 className="font-body text-[15px] font-semibold text-violet-50 mb-1.5">
                    {title}
                  </h3>
                  <p className="font-body text-[13px] leading-relaxed text-slate-400/80">
                    {description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
