"use client"

import { motion } from "motion/react"
import { Instagram, Globe, BarChart3, Users, LineChart, TrendingUp } from "lucide-react"
import { CardSpotlight, FeatureItem } from "@/components/Landing/CardSpotlight"
import { Inter } from "next/font/google"

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function Features() {
  const features = [
    {
      icon: <Instagram className="h-10 w-10 text-pink-500" />,
      title: "Social Media Analysis",
      description: "Track engagement metrics, content strategy, and audience growth across all major social platforms.",
      badge: "Analytics",
      items: [
        "Track engagement metrics",
        "Monitor content performance",
        "Analyze audience growth",
        "Compare platform strategies",
      ],
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-500" />,
      title: "Website Performance",
      description: "Monitor traffic, SEO rankings, content updates, and user experience metrics.",
      badge: "Monitoring",
      items: ["Track traffic patterns", "Monitor SEO rankings", "Analyze content updates", "Measure user experience"],
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-purple-500" />,
      title: "Market Activity Tracking",
      description: "Stay updated on product launches, pricing changes, and promotional campaigns.",
      badge: "Market Intel",
      items: [
        "Monitor product launches",
        "Track pricing changes",
        "Analyze promotional campaigns",
        "Identify market trends",
      ],
    },
    {
      icon: <Users className="h-10 w-10 text-green-500 z-1000" />,
      title: "Audience Insights",
      description: "Understand your competitors' audience demographics, preferences, and engagement patterns.",
      badge: "Demographics",
      items: [
        "Analyze audience demographics",
        "Identify user preferences",
        "Track engagement patterns",
        "Compare audience segments",
      ],
    },
    {
      icon: <LineChart className="h-10 w-10 text-yellow-500" />,
      title: "Performance Trends",
      description: "Visualize long-term trends and identify seasonal patterns in competitor performance.",
      badge: "Trends",
      items: [
        "Visualize long-term trends",
        "Identify seasonal patterns",
        "Predict future performance",
        "Compare historical data",
      ],
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-red-500" />,
      title: "Competitive Benchmarking",
      description: "Compare your performance against industry standards and top competitors.",
      badge: "Benchmarking",
      items: [
        "Compare against industry standards",
        "Measure against top competitors",
        "Identify performance gaps",
        "Set realistic targets",
      ],
    },
  ]

  return (
    <section id="features" className="bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Comprehensive Competitor Analysis
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Track, analyze, and visualize your competitors&apos; performance across multiple channels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardSpotlight className="h-full" color="#000000">
                <div className="flex items-center gap-3 mb-4 relative z-30">
                  <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center relative z-30">
                    {feature.icon}
                  </div>
                  <span className="bg-gray-800 text-white text-xs rounded-full px-3 py-1 relative z-30">
                    {feature.badge}
                  </span>
                </div>
                <p className={`${inter.className} text-xl font-bold relative z-20 mt-2 text-white`}>{feature.title}</p>
                <div className={`${inter.className} text-neutral-200 mt-4 relative z-20`}>
                  {feature.description}
                  <ul className="list-none mt-4 space-y-2">
                    {feature.items.map((item, i) => (
                      <FeatureItem key={i} title={item} />
                    ))}
                  </ul>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
