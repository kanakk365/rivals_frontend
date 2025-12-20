"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  TrendingUp,
  Shield,
  Search,
  Users,
  Eye,
  MousePointer,
  Clock,
  Loader2,
  Hash,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { WebsiteTrafficChart } from "./WebsiteTrafficChart";
import { useWebsiteStore } from "@/store/websiteStore";
import { useCompaniesStore } from "@/store/companiesStore";
import { DemoDataWrapper } from "@/components/ui/DemoDataWrapper";

interface WebsiteTabProps {
  companySlug: string;
}

// Mock data - replace with actual API calls
const websiteAnalyticsData = {
  overview: {
    totalTraffic: 12500000,
    trustScore: 87,
    bounceRate: 42.5,
    avgSessionDuration: "3:24",
    pageViews: 45600000,
    uniqueVisitors: 8900000,
  },
  topKeywords: [
    { keyword: "coffee near me", position: 2, volume: 245000, difficulty: 78 },
    {
      keyword: "best coffee shop",
      position: 4,
      volume: 189000,
      difficulty: 72,
    },
    { keyword: "coffee delivery", position: 3, volume: 156000, difficulty: 65 },
    {
      keyword: "specialty coffee",
      position: 5,
      volume: 134000,
      difficulty: 68,
    },
    {
      keyword: "coffee beans online",
      position: 7,
      volume: 98000,
      difficulty: 61,
    },
    { keyword: "cold brew coffee", position: 6, volume: 87000, difficulty: 59 },
    {
      keyword: "coffee subscription",
      position: 8,
      volume: 76000,
      difficulty: 64,
    },
    { keyword: "organic coffee", position: 9, volume: 65000, difficulty: 57 },
  ],
  trafficSources: [
    { source: "Organic Search", visitors: 5200000, percentage: 41.6 },
    { source: "Direct", visitors: 3100000, percentage: 24.8 },
    { source: "Social Media", visitors: 2400000, percentage: 19.2 },
    { source: "Referral", visitors: 1200000, percentage: 9.6 },
    { source: "Paid Search", visitors: 600000, percentage: 4.8 },
  ],
  trafficTrend: [
    { month: "Jan", visitors: 11200000, pageViews: 42500000, bounceRate: 45 },
    { month: "Feb", visitors: 9800000, pageViews: 38200000, bounceRate: 44 },
    { month: "Mar", visitors: 12800000, pageViews: 46800000, bounceRate: 43 },
    { month: "Apr", visitors: 10500000, pageViews: 40200000, bounceRate: 43 },
    { month: "May", visitors: 13500000, pageViews: 48500000, bounceRate: 42.5 },
    { month: "Jun", visitors: 12200000, pageViews: 44600000, bounceRate: 42.5 },
  ],
  seoMetrics: {
    domainAuthority: 78,
    pageAuthority: 72,
    backlinks: 245000,
    referringDomains: 12400,
    organicKeywords: 45600,
    indexedPages: 8900,
  },
  topPages: [
    { page: "/menu", views: 4500000, avgTime: "4:12", bounceRate: 38 },
    { page: "/locations", views: 3200000, avgTime: "2:45", bounceRate: 42 },
    { page: "/order-online", views: 2800000, avgTime: "5:30", bounceRate: 35 },
    { page: "/rewards", views: 2100000, avgTime: "3:18", bounceRate: 40 },
    { page: "/about", views: 1800000, avgTime: "2:55", bounceRate: 45 },
  ],
};

export default function WebsiteTab({ companySlug }: WebsiteTabProps) {
  const {
    keywordSuggestions,
    keywordSuggestionsLoading,
    fetchKeywordSuggestions,
    clearWebsiteData,
  } = useWebsiteStore();

  const { companies } = useCompaniesStore();

  useEffect(() => {
    const matchingCompany = companies.find(
      (c) =>
        c.brand_name.toLowerCase().replace(/\s+/g, "-") ===
        companySlug.toLowerCase() ||
        c.domain.toLowerCase().includes(companySlug.toLowerCase()) ||
        companySlug.toLowerCase().includes(c.brand_name.toLowerCase())
    );

    const domain = matchingCompany
      ? matchingCompany.domain
      : `${companySlug.toLowerCase().replace(/-/g, "")}.com`;

    fetchKeywordSuggestions(domain);

    return () => {
      clearWebsiteData();
    };
  }, [companySlug, companies, fetchKeywordSuggestions, clearWebsiteData]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrustScoreBg = (score: number) => {
    if (score >= 80) return "from-green-500/10 via-card to-card";
    if (score >= 60) return "from-yellow-500/10 via-card to-card";
    return "from-red-500/10 via-card to-card";
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <DemoDataWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Traffic
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">
                {formatNumber(websiteAnalyticsData.overview.totalTraffic)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Monthly visitors
              </p>
            </CardContent>
          </Card>

          <Card
            className={`rounded-3xl border border-border/60 bg-gradient-to-br ${getTrustScoreBg(
              websiteAnalyticsData.overview.trustScore
            )} shadow-lg`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/20">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Trust Score
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className={`text-4xl font-bold ${getTrustScoreColor(
                  websiteAnalyticsData.overview.trustScore
                )}`}
              >
                {websiteAnalyticsData.overview.trustScore}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Out of 100</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-accent/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent/30">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Page Views
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">
                {formatNumber(websiteAnalyticsData.overview.pageViews)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total page views
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Unique Visitors
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">
                {formatNumber(websiteAnalyticsData.overview.uniqueVisitors)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Monthly unique users
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-accent/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent/30">
                  <MousePointer className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Bounce Rate
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">
                {websiteAnalyticsData.overview.bounceRate}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Visitors leaving quickly
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Avg. Session
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">
                {websiteAnalyticsData.overview.avgSessionDuration}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Average time on site
              </p>
            </CardContent>
          </Card>
        </div>
      </DemoDataWrapper>

      {/* Traffic Trend */}
      <DemoDataWrapper>
        <WebsiteTrafficChart data={websiteAnalyticsData.trafficTrend} />
      </DemoDataWrapper>

      {/* Top Keywords */}
      <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/20">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Keyword Suggestions</CardTitle>
              <p className="text-sm text-muted-foreground">
                {keywordSuggestions.length > 0
                  ? `${keywordSuggestions.length} keyword suggestions from search data`
                  : "Highest ranking keywords driving organic traffic"}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {keywordSuggestionsLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : keywordSuggestions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Rank
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Keyword Suggestion
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Word Count
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Length
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {keywordSuggestions.map((keyword) => (
                    <tr
                      key={keyword.rank}
                      className="border-b border-border/50 hover:bg-accent/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                          #{keyword.rank}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-foreground">
                            {keyword.suggestion}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-foreground font-semibold text-sm">
                          {keyword.word_count} words
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-muted-foreground">
                        {keyword.length} chars
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Fallback to mock data
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Keyword
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Position
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Search Volume
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {websiteAnalyticsData.topKeywords.map((keyword, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/50 hover:bg-accent/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                          <span className="font-semibold text-foreground">
                            {keyword.keyword}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 font-semibold text-sm">
                          <TrendingUp className="h-3 w-3" />#{keyword.position}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">
                        {formatNumber(keyword.volume)}/mo
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-24 bg-border/40 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${keyword.difficulty >= 70
                                ? "bg-red-500"
                                : keyword.difficulty >= 50
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                }`}
                              style={{ width: `${keyword.difficulty}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-foreground w-8">
                            {keyword.difficulty}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO Metrics & Traffic Sources */}
      <DemoDataWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SEO Metrics */}
          <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">SEO Performance</CardTitle>
              <p className="text-sm text-muted-foreground">
                Search engine optimization metrics
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Domain Authority
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {websiteAnalyticsData.seoMetrics.domainAuthority}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Page Authority
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {websiteAnalyticsData.seoMetrics.pageAuthority}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Backlinks
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatNumber(websiteAnalyticsData.seoMetrics.backlinks)}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Referring Domains
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatNumber(
                      websiteAnalyticsData.seoMetrics.referringDomains
                    )}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Organic Keywords
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatNumber(
                      websiteAnalyticsData.seoMetrics.organicKeywords
                    )}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Indexed Pages
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatNumber(websiteAnalyticsData.seoMetrics.indexedPages)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Traffic Sources</CardTitle>
              <p className="text-sm text-muted-foreground">
                Where visitors are coming from
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={websiteAnalyticsData.trafficSources}
                  layout="vertical"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.3}
                  />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <YAxis
                    type="category"
                    dataKey="source"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                    formatter={(value: number, name, props) => [
                      `${formatNumber(value)} (${props.payload.percentage}%)`,
                      "Visitors",
                    ]}
                  />
                  <Bar
                    dataKey="visitors"
                    fill="hsl(var(--primary))"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </DemoDataWrapper>

      {/* Top Pages */}
      <DemoDataWrapper>
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Top Performing Pages</CardTitle>
            <p className="text-sm text-muted-foreground">
              Most visited pages and their performance metrics
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Page
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Views
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Avg. Time
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                      Bounce Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {websiteAnalyticsData.topPages.map((page, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/50 hover:bg-accent/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                          <span className="font-semibold text-foreground font-mono text-sm">
                            {page.page}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">
                        {formatNumber(page.views)}
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">
                        {page.avgTime}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`font-semibold ${page.bounceRate < 40
                            ? "text-green-600"
                            : page.bounceRate < 50
                              ? "text-yellow-600"
                              : "text-red-600"
                            }`}
                        >
                          {page.bounceRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </DemoDataWrapper>
    </div>
  );
}
