"use client"

import { motion } from "motion/react"
import { LampContainer } from "@/components/Landing/LampContainer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function LampDemo() {
  return (
    <LampContainer className="py-16 md:py-24" >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm p-2 rounded-lg mb-4 text-sm font-medium text-center text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/20">
            TRUSTED BY INDUSTRY LEADERS
          </div>
          <h2 className="mt-6 bg-gradient-to-br from-white to-gray-400 py-4 bg-clip-text text-center text-4xl font-light tracking-tight text-transparent md:text-7xl">
            Gain the competitive <br /> advantage today
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-6 text-center text-gray-400 max-w-xl text-lg font-light"
        >
          Start tracking your competitors and make data-driven decisions that put you ahead of the market. Unlock
          insights that transform your strategy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto justify-center"
        >
          <Link href="/signup" className="w-full sm:w-auto">
            <button
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 group rounded-lg text-white font-medium flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
          <button
            className="w-full sm:w-auto px-8 py-4 border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 rounded-lg font-medium"
          >
            View Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.9,
            duration: 1,
            ease: "easeInOut",
          }}
          className="mt-12 flex items-center justify-center gap-8"
        >
          {["Acme Inc", "Globex", "Stark Industries", "Wayne Enterprises", "Umbrella Corp"].map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.2 }}
              className="text-gray-500 text-sm font-medium hidden md:block"
            >
              {company}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-500 text-sm font-medium md:hidden"
          >
            Trusted by 500+ companies
          </motion.div>
        </motion.div>
      </div>
    </LampContainer>
  )
}
