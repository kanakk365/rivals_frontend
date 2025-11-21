"use client"

import {
  TrendingUp,
  Instagram,
  Globe,
  BarChart3,
  Target,
  AlertCircle,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GuestTrafficChart } from "@/components/dashboard/full-area-chart"

interface DashboardData {
  competitors: {
    total: number
    active: number
    newThisMonth: number
    growth: number
  }
  socialMedia: {
    totalPosts: number
    avgEngagement: number
    followersGrowth: number
    topPlatform: string
  }
  website: {
    totalTraffic: number
    avgRanking: number
    contentUpdates: number
    seoScore: number
  }
  marketActivity: {
    productLaunches: number
    priceChanges: number
    promotions: number
    alerts: number
  }
  insights: {
    totalInsights: number
    actionable: number
    trends: number
    accuracy: number
  }
  performance: {
    dataPoints: number
    updateFrequency: string
    coverage: number
    reliability: number
  }
}

const dashboardData: DashboardData = {
  competitors: {
    total: 24,
    active: 22,
    newThisMonth: 3,
    growth: 14,
  },
  socialMedia: {
    totalPosts: 1248,
    avgEngagement: 8.4,
    followersGrowth: 12,
    topPlatform: "Instagram",
  },
  website: {
    totalTraffic: 1542000,
    avgRanking: 12,
    contentUpdates: 342,
    seoScore: 87,
  },
  marketActivity: {
    productLaunches: 8,
    priceChanges: 24,
    promotions: 18,
    alerts: 42,
  },
  insights: {
    totalInsights: 1248,
    actionable: 342,
    trends: 28,
    accuracy: 94,
  },
  performance: {
    dataPoints: 45620,
    updateFrequency: "Real-time",
    coverage: 95,
    reliability: 98,
  },
}

function StatRow({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper?: string
}) {
  return (
    <div className="flex items-start justify-between rounded-lg border border-border/60 bg-[hsl(var(--accent)/0.12)] px-3 py-3">
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
          {label}
        </span>
        {helper ? <span className="text-xs text-[var(--muted-foreground)]">{helper}</span> : null}
      </div>
      <span className="text-sm font-semibold text-[var(--card-foreground)]">{value}</span>
    </div>
  )
}

export default function Content() {
  const formatNumber = (num: number) => new Intl.NumberFormat("en-US").format(num)

  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-12">
      {/* Competitors Spotlight */}
      <Card className="relative overflow-hidden rounded-3xl border-none bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white shadow-xl lg:col-span-2 xl:col-span-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.35),_transparent_60%)]" />
        <CardHeader className="relative space-y-6 p-6 pb-4">
          <div className="flex items-start justify-between gap-6">
            <div>
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
                Competitors Tracked
              </CardDescription>
              <CardTitle className="mt-3 text-5xl font-semibold text-white">
                {dashboardData.competitors.total} active
              </CardTitle>
              <p className="mt-2 text-sm text-white/80">
                Real-time monitoring across social media, websites, and market activities
              </p>
            </div>
            <span className="rounded-full bg-white/15 p-3 text-white">
              <Target className="size-7" />
            </span>
          </div>
          <Badge className="w-fit gap-2 bg-white/15 text-white">
            <TrendingUp className="size-4" />
            +{dashboardData.competitors.growth}% growth this month
          </Badge>
        </CardHeader>
        <CardContent className="relative p-6 pt-0">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Active Tracking</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {dashboardData.competitors.active}
              </p>
              <p className="mt-2 text-xs text-white/70">Currently being monitored</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">New This Month</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                +{dashboardData.competitors.newThisMonth}
              </p>
              <p className="mt-2 text-xs text-white/70">Recently added competitors</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Coverage</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {dashboardData.performance.coverage}%
              </p>
              <p className="mt-2 text-xs text-white/70">Data collection success rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Analysis */}
      <Card className="flex flex-col rounded-3xl border border-border/60 bg-[var(--card)]/90 shadow-sm backdrop-blur lg:col-span-1 xl:col-span-3">
        <CardHeader className="space-y-4 p-6 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                Social Media
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-semibold text-[var(--card-foreground)]">
                {formatNumber(dashboardData.socialMedia.totalPosts)} posts
              </CardTitle>
              <p className="text-xs text-[var(--muted-foreground)]">Tracked this month</p>
            </div>
            <span className="rounded-full bg-[hsl(var(--accent)/0.24)] p-2 text-[hsl(var(--primary))]">
              <Instagram className="size-5" />
            </span>
          </div>
          <Badge className="w-fit bg-[hsl(var(--accent)/0.24)] text-[var(--accent-foreground)]">
            <TrendingUp className="mr-1 size-4" />
            +{dashboardData.socialMedia.followersGrowth}% follower growth
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 p-6">
          <StatRow label="Avg Engagement" value={`${dashboardData.socialMedia.avgEngagement}%`} helper="Across all platforms" />
          <StatRow label="Top Platform" value={dashboardData.socialMedia.topPlatform} helper="Most active" />
        </CardContent>
      </Card>

      {/* Website Performance */}
      <Card className="flex flex-col rounded-3xl border border-border/60 bg-[var(--card)]/90 shadow-sm backdrop-blur lg:col-span-1 xl:col-span-3">
        <CardHeader className="space-y-4 p-6 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                Website Traffic
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-semibold text-[var(--card-foreground)]">
                {formatLargeNumber(dashboardData.website.totalTraffic)} visits
              </CardTitle>
              <p className="text-xs text-[var(--muted-foreground)]">Combined competitor traffic</p>
            </div>
            <span className="rounded-full bg-[hsl(var(--accent)/0.24)] p-2 text-[hsl(var(--primary))]">
              <Globe className="size-5" />
            </span>
          </div>
          <Badge className="w-fit bg-[hsl(var(--accent)/0.24)] text-[var(--accent-foreground)]">
            SEO Score {dashboardData.website.seoScore}%
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 p-6">
          <StatRow label="Avg Ranking" value={`#${dashboardData.website.avgRanking}`} helper="Search engine position" />
          <StatRow label="Content Updates" value={formatNumber(dashboardData.website.contentUpdates)} helper="Detected changes" />
        </CardContent>
      </Card>

      {/* Market Activity */}
      <Card className="flex flex-col rounded-3xl border border-border/60 bg-[var(--card)]/90 shadow-sm backdrop-blur lg:col-span-2 xl:col-span-6">
        <CardHeader className="space-y-4 p-6 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                Market Activity
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-semibold text-[var(--card-foreground)]">
                {dashboardData.marketActivity.alerts} alerts
              </CardTitle>
              <p className="text-xs text-[var(--muted-foreground)]">Product launches, pricing & promotions</p>
            </div>
            <span className="rounded-full bg-[hsl(var(--accent)/0.24)] p-2 text-[hsl(var(--primary))]">
              <BarChart3 className="size-5" />
            </span>
          </div>
          <Badge className="w-fit bg-[hsl(var(--accent)/0.24)] text-[var(--accent-foreground)]">
            <AlertCircle className="mr-1 size-4" />
            {dashboardData.marketActivity.productLaunches} launches detected
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-3 p-6 sm:grid-cols-2">
          <StatRow label="Product Launches" value={dashboardData.marketActivity.productLaunches.toString()} helper="New products detected" />
          <StatRow label="Price Changes" value={dashboardData.marketActivity.priceChanges.toString()} helper="Pricing updates" />
          <StatRow label="Promotions" value={dashboardData.marketActivity.promotions.toString()} helper="Active campaigns" />
          <StatRow label="Total Alerts" value={dashboardData.marketActivity.alerts.toString()} helper="All activity notifications" />
        </CardContent>
      </Card>

      {/* Insights & Analytics */}
      <Card className="flex flex-col rounded-3xl border border-border/60 bg-[var(--card)]/90 shadow-sm backdrop-blur lg:col-span-1 xl:col-span-3">
        <CardHeader className="space-y-4 p-6 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                Insights
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-semibold text-[var(--card-foreground)]">
                {formatNumber(dashboardData.insights.totalInsights)} generated
              </CardTitle>
              <p className="text-xs text-[var(--muted-foreground)]">
                AI-powered competitive intelligence
              </p>
            </div>
            <span className="rounded-full bg-[hsl(var(--accent)/0.24)] p-2 text-[hsl(var(--primary))]">
              <Zap className="size-5" />
            </span>
          </div>
          <Badge className="w-fit bg-[hsl(var(--accent)/0.24)] text-[var(--accent-foreground)]">
            Accuracy {dashboardData.insights.accuracy}%
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 p-6">
          <StatRow label="Actionable" value={formatNumber(dashboardData.insights.actionable)} helper="Ready to use insights" />
          <StatRow label="Trends Identified" value={dashboardData.insights.trends.toString()} helper="Market patterns" />
        </CardContent>
      </Card>

      {/* Data Performance */}
      <Card className="flex flex-col rounded-3xl border border-border/60 bg-[var(--card)]/90 shadow-sm backdrop-blur lg:col-span-1 xl:col-span-3">
        <CardHeader className="space-y-4 p-6 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardDescription className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                Data Collection
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-semibold text-[var(--card-foreground)]">
                {formatLargeNumber(dashboardData.performance.dataPoints)} points
              </CardTitle>
              <p className="text-xs text-[var(--muted-foreground)]">Collected this month</p>
            </div>
            <span className="rounded-full bg-[hsl(var(--accent)/0.24)] p-2 text-[hsl(var(--primary))]">
              <BarChart3 className="size-5" />
            </span>
          </div>
          <Badge className="w-fit bg-[hsl(var(--accent)/0.24)] text-[var(--accent-foreground)]">
            {dashboardData.performance.updateFrequency}
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 p-6">
          <StatRow label="Reliability" value={`${dashboardData.performance.reliability}%`} helper="System uptime" />
          <StatRow label="Coverage" value={`${dashboardData.performance.coverage}%`} helper="Data collection success" />
        </CardContent>
      </Card>

      <div className="lg:col-span-2 xl:col-span-12">
        <GuestTrafficChart />
      </div>
    </div>
  )
}
