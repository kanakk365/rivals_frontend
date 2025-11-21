"use client"

import { TestimonialsSection } from "@/components/Landing/TestimonialsMarquee"
import { TestimonialsSectionReverse } from "@/components/Landing/TestimonialsMarqueeReverse"

export default function Testimonial() {
  const testimonials = [
    {
      author: {
        name: "Sarah Johnson",
        handle: "Marketing Director",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      },
      text: "CompetitorIQ has transformed how we approach our market strategy. The insights we've gained have directly contributed to a 32% increase in our social engagement.",
    },
    {
      author: {
        name: "Michael Chen",
        handle: "Growth Strategist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      text: "The competitive analysis dashboard is intuitive and powerful. We've identified gaps in our strategy that were invisible to us before using this platform.",
    },
    {
      author: {
        name: "Priya Patel",
        handle: "Digital Marketing Lead",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      },
      text: "Finally, a tool that actually delivers actionable insights! We've been able to outmaneuver our competitors by staying one step ahead of their strategies.",
    },
    {
      author: {
        name: "James Wilson",
        handle: "E-commerce Director",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      text: "The social media analysis feature alone has been worth the investment. We've increased our market share by 18% since implementing the insights from CompetitorIQ.",
    },
    {
      author: {
        name: "Elena Rodriguez",
        handle: "Brand Manager",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      },
      text: "The real-time alerts for competitor activities have been a game-changer. We're now able to respond quickly to market changes instead of playing catch-up.",
    },
    {
      author: {
        name: "David Park",
        handle: "SEO Specialist",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      text: "The website performance tracking has helped us optimize our content strategy. Our organic traffic has increased by 45% in just three months.",
    },
  ]

  const testimonials2 = [
    {
      author: {
        name: "Alex Thompson",
        handle: "Product Manager",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face",
      },
      text: "The competitor benchmarking feature has been invaluable for our product development. We've been able to identify market gaps and capitalize on them quickly.",
    },
    {
      author: {
        name: "Sophia Garcia",
        handle: "Social Media Strategist",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      },
      text: "I can now track our competitors' social media performance in real-time. This has completely transformed our content strategy and engagement rates.",
    },
    {
      author: {
        name: "Marcus Lee",
        handle: "CMO",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      },
      text: "As a CMO, having all competitor data in one dashboard has streamlined our strategic planning. The ROI on this platform has been exceptional.",
    },
    {
      author: {
        name: "Olivia Wilson",
        handle: "Content Director",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
      text: "The content performance analytics have helped us refine our editorial calendar. We've seen a 40% increase in engagement since implementing these insights.",
    },
    {
      author: {
        name: "Ryan Patel",
        handle: "E-commerce Manager",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      },
      text: "Being able to monitor competitors' pricing strategies in real-time has given us a significant edge in our market positioning.",
    },
    {
      author: {
        name: "Emma Roberts",
        handle: "Digital Strategist",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      text: "The automated alerts for competitor website changes have saved us countless hours of manual monitoring. This tool is now essential to our workflow.",
    },
  ]

  return (
    <div className="bg-black">
      <TestimonialsSection
        title="Trusted by industry leaders"
        description="See how companies are gaining competitive advantage with our platform"
        testimonials={testimonials}
      />

      {/* Second testimonial section with reverse direction */}
      <TestimonialsSectionReverse
        testimonials={testimonials2}
        cardClassName="border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/10"
      />
    </div>
  )
}
