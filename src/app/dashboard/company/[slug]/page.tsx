"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import OverviewTab from "@/components/company/OverviewTab";
import SocialMediaSentimentTab from "@/components/company/SocialMediaSentimentTab";
import WebsiteSentimentTab from "@/components/company/WebsiteSentimentTab";
import WebsiteTab from "@/components/company/WebsiteTab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "social-media", label: "Social Media Sentiment" },
  { id: "website-sentiment", label: "Website Sentiment" },
  { id: "website", label: "Website" },
];

export default function CompanyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState("overview");

  // Format company name from slug
  const companyName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{companyName}</h1>
          <p className="text-muted-foreground mt-1">
            Competitive intelligence and market analysis
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pb-8">
        {activeTab === "overview" && <OverviewTab companySlug={slug} />}
        {activeTab === "social-media" && (
          <SocialMediaSentimentTab companySlug={slug} />
        )}
        {activeTab === "website-sentiment" && (
          <WebsiteSentimentTab companySlug={slug} />
        )}
        {activeTab === "website" && <WebsiteTab companySlug={slug} />}
      </div>
    </div>
  );
}
