"use client"

import HeroSection from "@/components/Landing/HeroSection"
import BentoSection from "@/components/Landing/BentoSection"
import UseCasesSection from "@/components/Landing/UseCasesSection"
import GlobalSection from "@/components/Landing/GlobalSection"
import FAQSection from "@/components/Landing/FAQSection"
import FooterSection from "@/components/Landing/FooterSection"
import LandingNav from "@/components/Landing/LandingNav"

export default function LandingPage() {
  return (
    <div style={{ background: "#07060c", minHeight: "100vh" }}>
      <LandingNav />
      <HeroSection />
      <BentoSection />
      <UseCasesSection />
      <GlobalSection />
      <FAQSection />
      <FooterSection />
    </div>
  )
}
