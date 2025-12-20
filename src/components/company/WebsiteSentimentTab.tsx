"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Minus,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { SentimentDonutChart } from "./SentimentDonutChart";
import { DemoDataWrapper } from "@/components/ui/DemoDataWrapper";

interface WebsiteSentimentTabProps {
  companySlug: string;
}

// Mock data - replace with actual API calls
const websiteSentimentData = {
  totalFeedback: 8450,
  sentimentBreakdown: {
    positive: 5690,
    neutral: 1920,
    negative: 840,
  },
  platforms: [
    {
      name: "Glassdoor",
      icon: "💼",
      totalReviews: 4820,
      rating: 4.2,
      positive: 3380,
      neutral: 1050,
      negative: 390,
      color: "hsl(142, 76%, 36%)",
    },
    {
      name: "Indeed",
      icon: "🔍",
      totalReviews: 3630,
      rating: 4.0,
      positive: 2310,
      neutral: 870,
      negative: 450,
      color: "hsl(221, 83%, 53%)",
    },
  ],
  feedbackTopics: [
    { topic: "Work-Life Balance", positive: 1240, neutral: 340, negative: 120 },
    { topic: "Company Culture", positive: 1580, neutral: 280, negative: 90 },
    { topic: "Career Growth", positive: 980, neutral: 520, negative: 180 },
    { topic: "Management", positive: 720, neutral: 450, negative: 280 },
    { topic: "Compensation", positive: 890, neutral: 330, negative: 170 },
    { topic: "Benefits", positive: 1120, neutral: 240, negative: 80 },
  ],
  wordFrequency: {
    positive: [
      { word: "Great", count: 1240 },
      { word: "Excellent", count: 980 },
      { word: "Amazing", count: 850 },
      { word: "Supportive", count: 720 },
      { word: "Flexible", count: 680 },
      { word: "Innovative", count: 620 },
      { word: "Professional", count: 580 },
      { word: "Collaborative", count: 540 },
    ],
    neutral: [
      { word: "Average", count: 420 },
      { word: "Standard", count: 380 },
      { word: "Typical", count: 340 },
      { word: "Moderate", count: 290 },
      { word: "Acceptable", count: 260 },
      { word: "Decent", count: 240 },
    ],
    negative: [
      { word: "Poor", count: 280 },
      { word: "Stressful", count: 240 },
      { word: "Difficult", count: 210 },
      { word: "Lacking", count: 180 },
      { word: "Limited", count: 160 },
      { word: "Disappointing", count: 140 },
    ],
  },
};

export default function WebsiteSentimentTab({
  companySlug,
}: WebsiteSentimentTabProps) {
  const sentimentData = [
    {
      name: "Positive",
      value: websiteSentimentData.sentimentBreakdown.positive,
      percentage: (
        (websiteSentimentData.sentimentBreakdown.positive /
          websiteSentimentData.totalFeedback) *
        100
      ).toFixed(1),
      color: "#64b5f6",
    },
    {
      name: "Neutral",
      value: websiteSentimentData.sentimentBreakdown.neutral,
      percentage: (
        (websiteSentimentData.sentimentBreakdown.neutral /
          websiteSentimentData.totalFeedback) *
        100
      ).toFixed(1),
      color: "#a48fff",
    },
    {
      name: "Negative",
      value: websiteSentimentData.sentimentBreakdown.negative,
      percentage: (
        (websiteSentimentData.sentimentBreakdown.negative /
          websiteSentimentData.totalFeedback) *
        100
      ).toFixed(1),
      color: "#ff79c6",
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <DemoDataWrapper>
      <div className="space-y-6">
        {/* Total Feedback Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Feedback
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">
                {formatNumber(websiteSentimentData.totalFeedback)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Across all platforms
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-cyan-500/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20">
                  <ThumbsUp className="h-5 w-5 text-cyan-600" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Positive
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-cyan-600">
                {formatNumber(websiteSentimentData.sentimentBreakdown.positive)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {sentimentData[0].percentage}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-purple-500/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20">
                  <Minus className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Neutral
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-600">
                {formatNumber(websiteSentimentData.sentimentBreakdown.neutral)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {sentimentData[1].percentage}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-slate-500/10 via-card to-card shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-500/20">
                  <ThumbsDown className="h-5 w-5 text-slate-600" />
                </div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Negative
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-slate-600">
                {formatNumber(websiteSentimentData.sentimentBreakdown.negative)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {sentimentData[2].percentage}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Breakdown */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Platform Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">
              Feedback distribution across Glassdoor and Indeed
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {websiteSentimentData.platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/40"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{platform.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {platform.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(platform.totalReviews)} reviews
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10">
                      <Star className="h-4 w-4 text-yellow-600 fill-yellow-600" />
                      <span className="text-sm font-bold text-yellow-600">
                        {platform.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          Positive
                        </span>
                      </div>
                      <span className="text-sm font-bold text-cyan-600">
                        {formatNumber(platform.positive)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          Neutral
                        </span>
                      </div>
                      <span className="text-sm font-bold text-purple-600">
                        {formatNumber(platform.neutral)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5">
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          Negative
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-600">
                        {formatNumber(platform.negative)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Topics & Overall Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feedback Topics & Themes - 2/3 width */}
          <Card className="lg:col-span-2 rounded-3xl border border-border/60 bg-card/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Feedback Topics & Themes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Common themes mentioned in employee reviews
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={websiteSentimentData.feedbackTopics}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="topic"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                    formatter={(value: number) => formatNumber(value)}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="rect"
                    formatter={(value) => (
                      <span className="text-sm text-foreground capitalize">
                        {value}
                      </span>
                    )}
                  />
                  <Bar
                    dataKey="positive"
                    fill="#64b5f6"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="neutral"
                    fill="#a48fff"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="negative"
                    fill="#ff79c6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Overall Sentiment Distribution - 1/3 width */}
          <SentimentDonutChart data={sentimentData} />
        </div>

        {/* Word Frequency by Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Positive Words */}
          <Card className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-card to-card shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-cyan-600" />
                <CardTitle className="text-lg text-cyan-600">
                  Positive Keywords
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Most frequent positive words
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {websiteSentimentData.wordFrequency.positive.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-muted-foreground bg-accent/10 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <span className="font-semibold text-foreground">
                          {item.word}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-cyan-600">
                        {formatNumber(item.count)}
                      </span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Neutral Words */}
          <Card className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-card to-card shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Minus className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg text-purple-600">
                  Neutral Keywords
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Most frequent neutral words
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {websiteSentimentData.wordFrequency.neutral.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground bg-accent/10 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <span className="font-semibold text-foreground">
                        {item.word}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">
                      {formatNumber(item.count)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Negative Words */}
          <Card className="rounded-3xl border border-slate-500/20 bg-gradient-to-br from-slate-500/5 via-card to-card shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsDown className="h-5 w-5 text-slate-600" />
                <CardTitle className="text-lg text-slate-600">
                  Negative Keywords
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Most frequent negative words
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {websiteSentimentData.wordFrequency.negative.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-muted-foreground bg-accent/10 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <span className="font-semibold text-foreground">
                          {item.word}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-600">
                        {formatNumber(item.count)}
                      </span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DemoDataWrapper>
  );
}
