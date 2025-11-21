"use client"

import { ContainerScroll } from "@/components/Landing/ContainerScroll"
import { BackgroundCells } from "@/components/Landing/Ripple"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  isVisible: boolean
}

export default function Hero({ isVisible }: HeroProps) {
  return (
    <div className="flex flex-col overflow-hidden pb-[200px] pt-[100px]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundCells className="bg-black">{/* Empty children to avoid the mt-40 spacing */}</BackgroundCells>
      </div>

      {/* Scroll Animation - with higher z-index to appear above the background */}
      <div className="relative z-50">
        <ContainerScroll
          titleComponent={
            <>
              <div className="bg-black/40 backdrop-blur-sm py-6 px-4 rounded-xl">
                <h1 className="text-4xl font-semibold text-white">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                    Outsmart
                  </span>{" "}
                  your competition with <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Real-Time Analytics
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-6">
                  Gain valuable insights into your competitors' strategies across social media, websites, and market
                  activities with our comprehensive dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
                  <Link href="/signup">
                    <button
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 rounded-lg text-white font-medium flex items-center justify-center"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </Link>
                  <button
                    className="px-8 py-4 border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 rounded-lg font-medium"
                  >
                    Book a Demo
                  </button>
                </div>
              </div>
            </>
          }
        >
          <Image
            src="/ourdashboard1.jpg"
            alt="CompetitorIQ Analytics Dashboard"
            fill
            sizes="(max-width: 768px) 100vw, 1400px"
            className="mx-auto rounded-2xl object-cover object-center"
            style={{ width: "100%", height: "100%" }}
            draggable={false}
            priority
          />
        </ContainerScroll>
      </div>
    </div>
  )
}
