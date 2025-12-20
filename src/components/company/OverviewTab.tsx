"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Users,
  TrendingUp,
  DollarSign,
  Briefcase,
  Activity,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ClippedAreaChart } from "./ClippedAreaChart";
import { SentimentDonutChart } from "./SentimentDonutChart";
import { cn } from "@/lib/utils";
import { useCompanyDataStore } from "@/store/companyDataStore";
import { useCompaniesStore } from "@/store/companiesStore";
import { DemoDataWrapper } from "@/components/ui/DemoDataWrapper";

interface OverviewTabProps {
  companySlug: string;
  themeGradient?: string;
}

// Fallback data for sections not covered by API
const getFallbackData = () => ({
  funding: {
    totalRounds: 12,
    latestRaised: "$500M",
    totalFunding: "$2.5B",
    lastRoundDate: "March 2024",
    leadInvestor: "Sequoia Capital",
    valuation: "$15.2B",
  },
  hiring: {
    activeJobs: 342,
    recentHires: 1240,
    growthRate: 15.3,
    topRoles: ["Barista", "Store Manager", "Software Engineer"],
  },
  sentiment: [
    { name: "Positive", value: 65, color: "#64b5f6" },
    { name: "Neutral", value: 25, color: "#a48fff" },
    { name: "Negative", value: 10, color: "#ff79c6" },
  ],
});

export default function OverviewTab({
  companySlug,
  themeGradient,
}: OverviewTabProps) {
  const { companyData, isLoading, error, fetchCompanyData, clearCompanyData } =
    useCompanyDataStore();
  const { companies } = useCompaniesStore();
  const fallbackData = getFallbackData();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const matchingCompany = companies.find(
      (c) =>
        c.brand_name.toLowerCase().replace(/\s+/g, "-") ===
        companySlug.toLowerCase() ||
        c.domain.toLowerCase().includes(companySlug.toLowerCase()) ||
        companySlug.toLowerCase().includes(c.brand_name.toLowerCase())
    );

    if (matchingCompany) {
      fetchCompanyData(matchingCompany.domain, 1, matchingCompany.brand_name);
    } else {
      const domain = `${companySlug.toLowerCase().replace(/-/g, "")}.com`;
      const name = companySlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      fetchCompanyData(domain, 1, name);
    }

    return () => {
      clearCompanyData();
    };
  }, [companySlug, companies, fetchCompanyData, clearCompanyData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading company data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <p className="text-destructive font-medium">
            Failed to load company data
          </p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const displayData = {
    name:
      companyData?.company_name ||
      companySlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    industry: companyData?.industry || "Not available",
    size: companyData?.size || "Not available",
    location: companyData?.headquarters || "Not available",
    description: companyData?.description || "No description available.",
    logoUrl: companyData?.logo_url || null,
    tradingStatus: companyData?.trading_status || "Unknown",
    overallScore: companyData?.score ? companyData.score / 10 : 0,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-accent/5 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {displayData.logoUrl ? (
                  <img
                    src={displayData.logoUrl}
                    alt={displayData.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />
                ) : (
                  <div
                    className={cn(
                      "p-3 rounded-2xl bg-gradient-to-br",
                      themeGradient || "from-primary to-accent"
                    )}
                  >
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {displayData.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-muted-foreground">
                      {displayData.industry}
                    </p>
                    {displayData.tradingStatus && displayData.tradingStatus !== "Unknown" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                        {displayData.tradingStatus}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p
                className={cn(
                  "text-sm text-foreground/90 leading-relaxed",
                  !isDescriptionExpanded && "line-clamp-2"
                )}
              >
                {displayData.description}
              </p>
              {displayData.description.length > 150 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-sm text-primary hover:text-primary/80 font-medium mt-1 transition-colors"
                >
                  {isDescriptionExpanded ? "Show less" : "More"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 border border-border/40">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Company Size
                  </p>
                  <p className="text-sm font-semibold">{displayData.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 border border-border/40">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Headquarters
                  </p>
                  <p className="text-sm font-semibold">{displayData.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "rounded-3xl border border-border/60 text-white shadow-xl relative overflow-hidden bg-gradient-to-br",
            themeGradient || "from-primary via-primary to-accent"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_60%)]" />
          <CardHeader className="relative">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="text-7xl font-bold mb-2">
                {displayData.overallScore.toFixed(1)}
              </div>
              <div className="text-sm text-white/80">out of 10</div>
              <div className="mt-6 w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${displayData.overallScore * 10}%` }}
                />
              </div>
              <p className="text-xs text-white/70 mt-4 text-center">
                Based on market performance, sentiment, and growth metrics
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <DemoDataWrapper>
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/20">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Funding & Valuation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Total Rounds
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {fallbackData.funding.totalRounds}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Latest Raised
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {fallbackData.funding.latestRaised}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Total Funding
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {fallbackData.funding.totalFunding}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Last Round
                </p>
                <p className="text-sm font-bold text-foreground">
                  {fallbackData.funding.lastRoundDate}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Lead Investor
                </p>
                <p className="text-sm font-bold text-foreground">
                  {fallbackData.funding.leadInvestor}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Valuation
                </p>
                <p className="text-2xl font-bold text-primary">
                  {fallbackData.funding.valuation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DemoDataWrapper>

      <DemoDataWrapper>
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/20">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Hiring Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground font-medium">
                    Active Jobs
                  </p>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {fallbackData.hiring.activeJobs}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground font-medium">
                    Recent Hires
                  </p>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {fallbackData.hiring.recentHires.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground font-medium">
                    Growth Rate
                  </p>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {fallbackData.hiring.growthRate}%
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                <p className="text-xs text-muted-foreground font-medium mb-3">
                  Top Roles
                </p>
                <div className="space-y-1">
                  {fallbackData.hiring.topRoles.map((role, index) => (
                    <div
                      key={index}
                      className="text-xs font-medium text-foreground bg-background/50 px-2 py-1 rounded"
                    >
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DemoDataWrapper>

      <DemoDataWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ClippedAreaChart />
          </div>
          <SentimentDonutChart data={fallbackData.sentiment} />
        </div>
      </DemoDataWrapper>
    </div>
  );
}
