"use client"

import { useState, useEffect, startTransition } from "react"
import Navbar from "@/components/Landing/Navbar"
import Hero from "@/components/Landing/Hero"
import Features from "@/components/Landing/Features"
import About from "@/components/Landing/About"
import DashboardPreview from "@/components/Landing/DashboardPreview"
import Testimonials from "@/components/Landing/Testimonials"
import Footer from "@/components/Landing/Footer"
import { TracingBeam } from "@/components/Landing/TracingBeam"
import { LampDemo } from "@/components/Landing/Lamp"
import { ForceDarkMode } from "@/components/providers/force-dark-mode"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setIsVisible(true)
    })
  }, [])

  return (

      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Hero isVisible={isVisible} />
        <TracingBeam className="max-w-[1400px] mx-auto">
          <Features />
          <About />
          <DashboardPreview />
          <Testimonials />
        </TracingBeam>
        <LampDemo />
        <Footer />
      </div>

  )
}
