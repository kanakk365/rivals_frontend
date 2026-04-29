"use client"

import { useState } from "react"
import { motion } from "motion/react"

const FAQS = [
  {
    q: "How does Rivalis collect competitor data?",
    a: "Rivalis uses AI-powered web scrapers that continuously monitor competitor websites, social profiles, job boards, ad libraries, and press mentions. Data is normalised and deduplicated before it reaches your dashboard — no manual work required.",
  },
  {
    q: "How frequently is the data updated?",
    a: "Most signals — pricing pages, social posts, website copy — refresh every 24 hours. High-velocity sources like social media metrics update multiple times per day. You can also trigger a manual re-scrape for any competitor at any time.",
  },
  {
    q: "How many competitors can I track?",
    a: "The number of tracked competitors depends on your plan. The Pro plan supports up to 20 rivals, while Enterprise allows unlimited tracking. You can always add, remove, or swap competitors from your dashboard.",
  },
  {
    q: "What kind of signals does Rivalis monitor?",
    a: "Rivalis tracks pricing changes, website copy & SEO shifts, social media growth and engagement, ad creative from major platforms, job postings (as a proxy for strategy), funding announcements, product launches, and press coverage — all in one place.",
  },
  {
    q: "Is my data and my team's data secure?",
    a: "Yes. All data in transit is encrypted with TLS 1.3 and at rest with AES-256. We are SOC 2 Type II compliant and never share your watchlist or internal notes with third parties.",
  },
  {
    q: "Can I receive alerts when something changes?",
    a: "Absolutely. You can configure real-time alerts via email, Slack, or webhook for any signal — a competitor changes their pricing, launches a new feature, or suddenly ramps up hiring in a specific role.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — you get a 14-day free trial on the Pro plan with no credit card required. You'll have full access to all features so you can evaluate Rivalis with real competitors before committing.",
  },
  {
    q: "Can Rivalis integrate with tools we already use?",
    a: "Rivalis integrates natively with Slack, HubSpot, Notion, and Zapier. A REST API and webhook system are available on all paid plans so you can push signals into any internal tooling or data warehouse.",
  },
]

function FAQItem({ q, a }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-violet-400/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-body text-[14px] font-medium text-slate-200/90 group-hover:text-violet-200 transition-colors duration-150 leading-snug">
          {q}
        </span>

        <span
          className={`flex-shrink-0 relative w-6 h-6 flex items-center justify-center rounded-md border bg-violet-500/10 transition-colors duration-200 ${
            open
              ? "border-violet-400/50 bg-violet-500/20"
              : "border-violet-400/20 group-hover:border-violet-400/40 group-hover:bg-violet-500/20"
          }`}
        >
          {/* horizontal bar */}
          <span className="absolute h-px w-2.5 bg-violet-300 rounded-full" />
          {/* vertical bar (rotates away when open) */}
          <span
            className="absolute h-2.5 w-px bg-violet-300 rounded-full transition-transform duration-200 ease-out"
            style={{ transform: open ? "scaleY(0)" : "scaleY(1)" }}
          />
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className="font-body text-[13px] leading-relaxed text-slate-400/75 pb-5 pr-10 transition-opacity duration-200"
            style={{ opacity: open ? 1 : 0 }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="relative w-full bg-[#07060c] py-24 px-6 lg:px-12 overflow-hidden">

      {/* top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(167,139,250,0.15) 50%, transparent 100%)",
        }}
      />

      {/* ambient bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(88,28,180,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24 items-start">

          {/* ── Left: header (sticky on desktop) ── */}
          <div className="lg:sticky lg:top-32 flex flex-col items-start gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/20 bg-violet-500/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="text-[11px] font-semibold text-violet-300 tracking-widest uppercase">
                FAQ
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-serif font-normal text-[clamp(1.9rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.02em] text-violet-50"
            >
              Questions,{" "}
              <span
                className="italic bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 40%, #a78bfa 100%)",
                }}
              >
                answered.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-[14px] text-slate-400/60 leading-relaxed max-w-[280px]"
            >
              Can't find what you're looking for? Reach out to our team and we'll get back to you within a few hours.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              href="mailto:support@rivalis.ai"
              className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium text-violet-400 hover:text-violet-300 transition-colors duration-150"
            >
              Contact support
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-px">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>

          {/* ── Right: accordion ── */}
          <div className="flex flex-col divide-y-0">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
