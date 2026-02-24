"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Globe,
  Activity,
  Link as LinkIcon,
  Award,
  Clock,
  Loader2,
  MonitorPlay,
  Share2,
  ExternalLink,
  Target,
  Search,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useWebsiteStore } from "@/store/websiteStore";
import { useCompaniesStore } from "@/store/companiesStore";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";

interface WebsiteSentimentTabProps {
  companySlug: string;
}

const COLORS = [
  "#64b5f6",
  "#81c784",
  "#ffb74d",
  "#e57373",
  "#ba68c8",
  "#4dd0e1",
  "#f06292",
  "#aed581",
  "#ff8a65",
  "#7986cb",
];

export default function WebsiteSentimentTab({
  companySlug,
}: WebsiteSentimentTabProps) {
  const { seoData, seoDataLoading, fetchSeoData } = useWebsiteStore();
  const { companies } = useCompaniesStore();

  useEffect(() => {
    const matchingCompany = companies.find(
      (c) =>
        c.brand_name.toLowerCase().replace(/\s+/g, "-") ===
          companySlug.toLowerCase() ||
        c.domain.toLowerCase().includes(companySlug.toLowerCase()) ||
        companySlug.toLowerCase().includes(c.brand_name.toLowerCase()),
    );

    if (matchingCompany) {
      fetchSeoData(matchingCompany.domain);
    } else {
      const domain = `${companySlug.toLowerCase().replace(/-/g, "")}.com`;
      fetchSeoData(domain);
    }
  }, [companySlug, companies, fetchSeoData]);

  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return "N/A";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatSeconds = (seconds: number | null | undefined) => {
    if (seconds === null || seconds === undefined) return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const trafficSourcesData = useMemo(() => {
    if (!seoData?.traffic_sources) return [];
    return seoData.traffic_sources
      .map((ts) => ({
        name: ts.source
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        value: ts.value,
        share: (ts.share * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);
  }, [seoData]);

  const searchTrafficData = useMemo(() => {
    if (!seoData?.traffic_trend?.search_traffic_history) return [];
    return [...seoData.traffic_trend.search_traffic_history]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((item) => ({
        ...item,
        dateFormatted: format(new Date(item.date), "MMM yyyy"),
      }));
  }, [seoData]);

  const visitsData = useMemo(() => {
    if (!seoData?.traffic_trend?.visits_history) return [];
    return [...seoData.traffic_trend.visits_history]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((item) => ({
        ...item,
        dateFormatted: format(new Date(item.date), "MMM yyyy"),
      }));
  }, [seoData]);

  if (seoDataLoading && !seoData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!seoData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Globe className="h-12 w-12 mb-4 opacity-20" />
        <p>No SEO data available for this company.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent w-fit">
            Website & SEO Analytics
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Comprehensive traffic, engagement, and visibility metrics
          </p>
        </div>
        {seoDataLoading && (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              {formatNumber(seoData.website_overview.total_traffic)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Monthly visits</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-cyan-500/10 via-card to-card shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20">
                <Award className="h-5 w-5 text-cyan-600" />
              </div>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Domain Authority
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-cyan-600">
              {seoData.seo_performance.domain_authority || "N/A"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              SEO strength score
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-purple-500/10 via-card to-card shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Avg. Session
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">
              {formatSeconds(seoData.website_overview.avg_session_seconds)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Time spent on site
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-orange-500/10 via-card to-card shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/20">
                <Activity className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Bounce Rate
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-orange-600">
              {seoData.website_overview.bounce_rate
                ? `${(seoData.website_overview.bounce_rate * 100).toFixed(1)}%`
                : "N/A"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Single-page visits
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits History Chart */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Visits Trend
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly traffic over time
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitsData}>
                  <defs>
                    <linearGradient
                      id="colorVisits"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.2}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="dateFormatted"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => formatNumber(val)}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                    }}
                    formatter={(val: number) => [
                      val.toLocaleString(),
                      "Visits",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#818cf8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources Pie Chart */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Share2 className="h-5 w-5 text-cyan-500" />
              Traffic Sources
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribution by channel
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {trafficSourcesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                      color: "hsl(var(--foreground))",
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(val: number, name: string, props: any) => [
                      `${val.toLocaleString()} (${props.payload.share}%)`,
                      name,
                    ]}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Traffic Breakthrough */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-500" />
              Search Traffic History
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Organic vs Paid search traffic
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={searchTrafficData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.2}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="dateFormatted"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => formatNumber(val)}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="organic_traffic"
                    name="Organic"
                    stackId="a"
                    fill="#6366f1"
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar
                    dataKey="paid_traffic"
                    name="Paid"
                    stackId="a"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SEO Performance Metrics List */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-amber-500" />
              SEO KPIs
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Technical SEO health summary
            </p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-accent/5 border border-border/40 hover:bg-accent/10 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">
                  Backlinks
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {formatNumber(seoData.seo_performance.backlinks)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-accent/5 border border-border/40 hover:bg-accent/10 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">
                  Ref. Domains
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {formatNumber(seoData.seo_performance.referring_domains)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-accent/5 border border-border/40 hover:bg-accent/10 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">
                  Org. Keywords
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {formatNumber(seoData.seo_performance.organic_keywords_count)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-accent/5 border border-border/40 hover:bg-accent/10 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">
                  Indexed Pages
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {formatNumber(seoData.seo_performance.indexed_pages)}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-emerald-600" />
                <div>
                  <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    Trust Score
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                    {seoData.website_overview.trust_score}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Keywords */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Top Ranking Keywords</CardTitle>
            <p className="text-sm text-muted-foreground">
              Keywords driving the most engagement
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {seoData.keyword_suggestions?.slice(0, 5).map((kw, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-xs font-bold text-primary">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{kw.keyword}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex flex-col items-end">
                      <span className="text-muted-foreground text-xs">Vol</span>
                      <span className="font-semibold">
                        {formatNumber(kw.search_volume)}
                      </span>
                    </div>
                    <div className="flex flex-col items-end w-16">
                      <span className="text-muted-foreground text-xs">
                        Share
                      </span>
                      <span className="font-semibold text-primary">
                        {(kw.traffic_share * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {(!seoData.keyword_suggestions ||
                seoData.keyword_suggestions.length === 0) && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No keywords found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Top Performing Pages</CardTitle>
            <p className="text-sm text-muted-foreground">
              Most visited pages by traffic share
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {seoData.top_performing_pages?.slice(0, 5).map((page, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors gap-2"
                >
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <MonitorPlay className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span
                      className="font-medium truncate text-sm"
                      title={page.page}
                    >
                      {page.page || "/"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm shrink-0">
                    <div className="font-semibold">
                      {formatNumber(page.views)}{" "}
                      <span className="text-muted-foreground font-normal text-xs ml-1">
                        views
                      </span>
                    </div>
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-1 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-6 w-6"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
              {(!seoData.top_performing_pages ||
                seoData.top_performing_pages.length === 0) && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No top pages found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
