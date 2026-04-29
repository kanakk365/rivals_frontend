"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import React from "react"

// Single source of truth so the sweep animation and the icon "discovery"
// keyframes stay in sync. The line ping-pongs (180° ↔ 0°) — one arc takes
// SWEEP_DURATION seconds, so a full round trip is 2 × SWEEP_DURATION.
export const SWEEP_DURATION  = 9   // seconds per sweep arc (one direction)
export const SWEEP_START_DEG = 180  // line starts pointing RIGHT
export const SWEEP_ARC_DEG   = 180  // sweeps right → up → left (upper 180° only)

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(5).fill(0)
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full",
        className,
      )}
    >
      <style>{`
        @keyframes radar-spin {
          0%   { transform: rotate(180deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-radar-spin {
          animation: radar-spin ${SWEEP_DURATION}s linear infinite alternate;
        }
      `}</style>

      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 -translate-y-1/2 z-40 h-[10px] w-[200px]"
      >
        {/* Wide blurred halo under the line */}
        <div
          className="absolute top-1/2 h-[8px] w-full -translate-y-1/2 blur-[5px]"
          style={{
            background:
              "linear-gradient(to left, rgba(167,139,250,0.5) 0%, rgba(139,92,246,0.18) 28%, rgba(139,92,246,0.03) 62%, transparent 100%)",
          }}
        />
        {/* Crisp 1px leading edge */}
        <div
          className="absolute top-1/2 h-[1px] w-full -translate-y-1/2"
          style={{
            background:
              "linear-gradient(to left, rgba(221,214,254,0.95) 0%, rgba(167,139,250,0.6) 20%, rgba(139,92,246,0.22) 55%, transparent 88%)",
          }}
        />
      </div>

      {/* Concentric rings — each one fainter than the last */}
      {circles.map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.08, duration: 0.5 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            height: `${(idx + 1) * 4.5}rem`,
            width:  `${(idx + 1) * 4.5}rem`,
            border: `1px solid rgba(139,92,246,${Math.max(0.03, 0.15 - idx * 0.026)})`,
          }}
        />
      ))}

      {/* Radial vignette — rings dissolve into the card bg at the edges */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, transparent 48%, rgba(7,6,12,0.35) 80%, rgba(7,6,12,0.95) 100%)",
        }}
      />

      {/* Center origin */}
      <div className="absolute z-[45] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(167,139,250,0.85)]" />
    </div>
  )
}

/**
 * Icon that is invisible by default and only becomes visible when the
 * sweep line passes over it — then fades to 0, leaving a short trail.
 *
 * `discoverAt` is the phase (0..1) of a one-way sweep when the rotating
 * line points at this icon. Because the line now ping-pongs, each icon
 * is passed twice per round trip: once at p/2 on the forward sweep, once
 * at 1 - p/2 on the reverse sweep (relative to the 2 × SWEEP_DURATION
 * round-trip cycle).
 */
export const RadarIconContainer = ({
  icon,
  text,
  discoverAt = 0.15,
}: {
  icon?: React.ReactNode
  text?: string
  discoverAt?: number
}) => {
  const p  = Math.max(0.01, Math.min(0.87, discoverAt))
  const p1 = p / 2          // forward pass — line crosses icon
  const p2 = 1 - p / 2      // reverse pass — line crosses icon again

  return (
    <motion.div
      animate={{
        opacity: [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        scale:   [1, 1, 1.22, 1, 1, 1, 1, 1.22, 1, 1, 1, 1],
      }}
      transition={{
        duration: SWEEP_DURATION * 2,
        repeat: Infinity,
        ease: "linear",
        // invisible → flash on forward pass → invisible → flash on reverse → invisible
        times: [
          0,
          Math.max(0, p1 - 0.0075),
          p1,
          p1 + 0.01,
          p1 + 0.02,
          p1 + 0.055,
          Math.max(p1 + 0.055, p2 - 0.0075),
          p2,
          p2 + 0.01,
          p2 + 0.02,
          Math.min(1, p2 + 0.055),
          1,
        ],
      }}
      className="flex flex-col items-center gap-1.5"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-[rgba(124,58,237,0.14)] shadow-[0_0_20px_rgba(124,58,237,0.4)] backdrop-blur-sm">
        {icon}
      </div>
      {text && (
        <span className="font-body text-[9px] font-medium tracking-wide text-violet-200/70">
          {text}
        </span>
      )}
    </motion.div>
  )
}
