"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useTransform, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export const TracingBeam = ({
  children,
  className,
  beamColor = "rgba(147, 51, 234, 0.5)", // Purple color to match theme
  beamWidth = 2,
}: {
  children: React.ReactNode
  className?: string
  beamColor?: string
  beamWidth?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.9], [50, svgHeight - 50]), {
    stiffness: 500,
    damping: 90,
  })

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <motion.div ref={ref} className={cn("relative w-full mx-auto h-full", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            height: svgHeight,
          }}
          className="relative h-full"
        >
          <svg
            viewBox={`0 0 ${beamWidth} ${svgHeight}`}
            width={beamWidth}
            height={svgHeight}
            className="block"
            aria-hidden="true"
          >
            <motion.path
              d={`M ${beamWidth / 2} 0 L ${beamWidth / 2} ${svgHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth={beamWidth}
              className="motion-reduce:hidden"
              transition={{
                duration: 0.2,
                delay: 0.5,
              }}
            />
            <defs>
              <motion.linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1} // Animate this value
                y2={y2} // Animate this value
              >
                <stop stopColor={beamColor} stopOpacity="0" />
                <stop stopColor={beamColor} />
                <stop offset="0.9" stopColor={beamColor} />
                <stop offset="1" stopColor={beamColor} stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
          <motion.div
            className="absolute top-0 w-2 h-6 rounded-full -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-purple-600 to-blue-600"
            style={{
              left: beamWidth / 2,
              top: y1,
            }}
          />
        </motion.div>
      </div>
      <div ref={contentRef} className="relative">
        {children}
      </div>
    </motion.div>
  )
}
