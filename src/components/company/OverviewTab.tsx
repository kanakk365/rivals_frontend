"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Users,
  TrendingUp,
  DollarSign,
  Briefcase,
  Activity,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

interface OverviewTabProps {
  companySlug: string;
}

// Mock data - replace with actual API calls
const getCompanyData = (slug: string) => ({
  name: slug.charAt(0).toUpperCase() + slug.slice(1),
  industry: "Food & Beverage",
  size: "Large Enterprise (10,000+ employees)",
  location: "Seattle, Washington, USA",
  description:
    "A global coffeehouse chain known for premium coffee and beverages. Leading the market with innovative products and strong brand presence across multiple countries.",
  overallScore: 8.7,
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
  activeUsers: [
    { month: "Jan", users: 2400000 },
    { month: "Feb", users: 2600000 },
    { month: "Mar", users: 2800000 },
    { month: "Apr", users: 3100000 },
    { month: "May", users: 3400000 },
    { month: "Jun", users: 3700000 },
  ],
  sentiment: [
    { name: "Positive", value: 65, color: "hsl(142, 76%, 36%)" },
    { name: "Neutral", value: 25, color: "hsl(45, 93%, 47%)" },
    { name: "Negative", value: 10, color: "hsl(0, 84%, 60%)" },
  ],
});

export default function OverviewTab({ companySlug }: OverviewTabProps) {
  const company = getCompanyData(companySlug);

  return (
    <div className="space-y-6">
      {/* Company Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <Card className="lg:col-span-2 rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-accent/5 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {company.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {company.industry}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground/90 leading-relaxed">
              {company.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 border border-border/40">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Company Size
                  </p>
                  <p className="text-sm font-semibold">{company.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 border border-border/40">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Headquarters
                  </p>
                  <p className="text-sm font-semibold">{company.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Score Card */}
        <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary via-primary to-accent text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_60%)]" />
          <CardHeader className="relative">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="text-7xl font-bold mb-2">
                {company.overallScore}
              </div>
              <div className="text-sm text-white/80">out of 10</div>
              <div className="mt-6 w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${company.overallScore * 10}%` }}
                />
              </div>
              <p className="text-xs text-white/70 mt-4 text-center">
                Based on market performance, sentiment, and growth metrics
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funding & Valuation */}
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
                {company.funding.totalRounds}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Latest Raised
              </p>
              <p className="text-2xl font-bold text-foreground">
                {company.funding.latestRaised}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Total Funding
              </p>
              <p className="text-2xl font-bold text-foreground">
                {company.funding.totalFunding}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Last Round
              </p>
              <p className="text-sm font-bold text-foreground">
                {company.funding.lastRoundDate}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Lead Investor
              </p>
              <p className="text-sm font-bold text-foreground">
                {company.funding.leadInvestor}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Valuation
              </p>
              <p className="text-2xl font-bold text-primary">
                {company.funding.valuation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hiring Data */}
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
                {company.hiring.activeJobs}
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
                {company.hiring.recentHires.toLocaleString()}
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
                {company.hiring.growthRate}%
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40">
              <p className="text-xs text-muted-foreground font-medium mb-3">
                Top Roles
              </p>
              <div className="space-y-1">
                {company.hiring.topRoles.map((role, index) => (
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users Chart */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Active Users Growth</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly active users over the last 6 months
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={company.activeUsers}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                  formatter={(value: number) => [
                    `${(value / 1000000).toFixed(2)}M users`,
                    "Active Users",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Pie Chart */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Overall Sentiment</CardTitle>
            <p className="text-sm text-muted-foreground">
              Customer sentiment analysis across all platforms
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={company.sentiment}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {company.sentiment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Percentage"]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm text-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
