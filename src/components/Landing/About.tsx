"use client"

import { motion } from "motion/react"
import Image from "next/image"

export default function About() {
  const steps = [
    {
      step: "01",
      title: "Connect Your Competitors",
      description:
        "Simply enter your competitors' websites and social media profiles. Our system will start tracking them immediately.",
      badge: "Setup",
      image: "/interactive-data-dashboard.png",
    },
    {
      step: "02",
      title: "Automated Data Collection",
      description:
        "Our AI-powered system continuously monitors and collects data across all channels without any manual work required.",
      badge: "Collection",
      image: "/automated-data-pipeline.png",
    },
    {
      step: "03",
      title: "Actionable Insights",
      description: "Access your personalized dashboard with visualized data, trends, and actionable recommendations.",
      badge: "Analysis",
      image: "/data-driven-decisions.png",
    },
  ]

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            How CompetitorHUB Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our platform collects, analyzes, and visualizes competitive data in three simple steps
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
              >
                <div className="md:w-1/2 space-y-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                      {step.step}
                    </div>
                    <span className="bg-gray-800 text-white text-xs rounded-full px-3 py-1">{step.badge}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-xl opacity-50"></div>
                    <div className="relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                      <Image
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
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
