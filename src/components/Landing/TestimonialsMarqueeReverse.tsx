"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimationControls } from "motion/react"
import { cn } from "@/lib/utils"
import { TestimonialCard, type TestimonialAuthor } from "@/components/Landing/TestimonialCard"

interface TestimonialsSectionReverseProps {
  title?: string
  description?: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
  cardClassName?: string
}

export function TestimonialsSectionReverse({
  title,
  description,
  testimonials,
  className,
  cardClassName,
}: TestimonialsSectionReverseProps) {
  const [key, setKey] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  // Reset animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setKey((prev) => prev + 1)
      }
    }, 30000) // Reset every 30 seconds (slowed down)

    return () => clearInterval(interval)
  }, [isPaused])

  // Control animation based on hover state
  useEffect(() => {
    if (isPaused) {
      controls.stop()
    } else {
      controls.start({ x: "100%" })
    }
  }, [isPaused, controls])

  return (
    <section className={cn("bg-black text-white", "pt-0 pb-12 sm:pb-24 px-0", className)}>
      {(title || description) && (
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8 mb-8 sm:mb-16">
          {title && (
            <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {description && <p className="text-md max-w-[600px] font-medium text-gray-400 sm:text-xl">{description}</p>}
        </div>
      )}

      <div className="relative w-full overflow-hidden">
        <div
          ref={containerRef}
          className="w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            key={key}
            className="flex gap-6"
            initial={{ x: "-100%" }}
            animate={controls}
            transition={{
              duration: 24, // Slowed down from 18 to 24 seconds
              ease: "linear",
              repeat: 0, // No repeat, will reset with key change
            }}
          >
            {/* Double the testimonials to ensure smooth scrolling */}
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <TestimonialCard
                key={`testimonial-reverse-${i}`}
                {...testimonial}
                className={cn(
                  "min-w-[320px] flex-shrink-0 transition-transform duration-300 hover:scale-105",
                  cardClassName,
                )}
              />
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black" />
      </div>
    </section>
  )
}
