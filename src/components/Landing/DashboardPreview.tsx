"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { NotificationPopover } from "@/components/Landing/NotificationPopover"

export default function DashboardPreview() {
  const features = [
    {
      title: "Real-time Updates",
      description: "Get data updates from all tracked sources as they happen",
      badge: "Live Data",
    },
    {
      title: "Customizable Widgets",
      description: "Create your own visualization options tailored to your needs",
      badge: "Personalization",
    },
    {
      title: "Automated Alerts",
      description: "Get notified of significant competitor changes immediately",
      badge: "Notifications",
    },
    {
      title: "Export Reports",
      description: "Download reports in multiple formats for presentations",
      badge: "Reporting",
    },
    {
      title: "Team Collaboration",
      description: "Share insights and annotations with your entire team",
      badge: "Teamwork",
    },
  ]

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Powerful Analytics Dashboard
              </h2>
              <span className="bg-purple-900/50 text-purple-300 text-xs rounded-full px-3 py-1 border border-purple-500/30">
                Premium
              </span>
            </div>
            <p className="text-xl text-gray-300">
              Our intuitive dashboard provides a comprehensive view of your competitive landscape with real-time updates
              and customizable reports.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-gray-800/70 p-4 rounded-lg border border-gray-800"
                >
                  <div className="bg-purple-500/20 rounded-full p-1 mt-1">
                    <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-white">{feature.title}</span>
                      <span className="bg-gray-800 text-xs rounded-full px-2 py-0.5 text-gray-300">
                        {feature.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 mt-4 font-medium shadow-lg shadow-purple-500/20 rounded-lg text-white transition-all duration-300">
                Explore Dashboard Features
              </button>
              <NotificationPopover
                buttonClassName="mt-4 bg-gray-800 hover:bg-gray-700 border border-gray-700"
                popoverClassName="bg-gray-900/95 backdrop-blur-md border border-gray-800"
                textColor="text-gray-200"
                hoverBgColor="hover:bg-gray-800"
                dividerColor="divide-gray-800"
                headerBorderColor="border-gray-800"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-xl opacity-50"></div>
            <div className="relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
              <Image
                src="/competitive-landscape-dashboard.png"
                width={800}
                height={600}
                alt="Dashboard Preview"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
