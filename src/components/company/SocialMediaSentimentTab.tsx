"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  Eye,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface SocialMediaSentimentTabProps {
  companySlug: string;
}

// Mock data
const socialMediaData = {
  overview: {
    totalFollowers: 12500000,
    engagementRate: 4.8,
    postReach: 8900000,
  },
  platforms: [
    {
      name: "Instagram",
      icon: Instagram,
      followers: 5200000,
      totalPosts: 1240,
      growth: 12.5,
      color: "hsl(330, 80%, 50%)",
    },
    {
      name: "Facebook",
      icon: Facebook,
      followers: 3800000,
      totalPosts: 890,
      growth: 8.3,
      color: "hsl(221, 44%, 41%)",
    },
    {
      name: "Twitter",
      icon: Twitter,
      followers: 2100000,
      totalPosts: 2340,
      growth: 15.7,
      color: "hsl(203, 89%, 53%)",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      followers: 980000,
      totalPosts: 456,
      growth: 22.1,
      color: "hsl(201, 100%, 35%)",
    },
    {
      name: "YouTube",
      icon: Youtube,
      followers: 420000,
      totalPosts: 124,
      growth: 18.9,
      color: "hsl(0, 100%, 50%)",
    },
  ],
  growthData: [
    {
      month: "Jan",
      Instagram: 4800000,
      Facebook: 3600000,
      Twitter: 1900000,
      LinkedIn: 850000,
      YouTube: 380000,
    },
    {
      month: "Feb",
      Instagram: 4900000,
      Facebook: 3650000,
      Twitter: 1950000,
      LinkedIn: 880000,
      YouTube: 390000,
    },
    {
      month: "Mar",
      Instagram: 5000000,
      Facebook: 3700000,
      Twitter: 2000000,
      LinkedIn: 920000,
      YouTube: 400000,
    },
    {
      month: "Apr",
      Instagram: 5050000,
      Facebook: 3720000,
      Twitter: 2030000,
      LinkedIn: 940000,
      YouTube: 405000,
    },
    {
      month: "May",
      Instagram: 5120000,
      Facebook: 3760000,
      Twitter: 2060000,
      LinkedIn: 960000,
      YouTube: 412000,
    },
    {
      month: "Jun",
      Instagram: 5200000,
      Facebook: 3800000,
      Twitter: 2100000,
      LinkedIn: 980000,
      YouTube: 420000,
    },
  ],
  platformMetrics: {
    Instagram: {
      posts: [
        {
          month: "Jan",
          posts: 45,
          likes: 125000,
          shares: 8900,
          comments: 12400,
          saves: 15600,
        },
        {
          month: "Feb",
          posts: 48,
          likes: 132000,
          shares: 9200,
          comments: 13100,
          saves: 16200,
        },
        {
          month: "Mar",
          posts: 52,
          likes: 145000,
          shares: 10100,
          comments: 14500,
          saves: 17800,
        },
        {
          month: "Apr",
          posts: 49,
          likes: 138000,
          shares: 9800,
          comments: 13800,
          saves: 17100,
        },
        {
          month: "May",
          posts: 51,
          likes: 142000,
          shares: 10300,
          comments: 14200,
          saves: 17600,
        },
        {
          month: "Jun",
          posts: 55,
          likes: 156000,
          shares: 11200,
          comments: 15600,
          saves: 19200,
        },
      ],
      sentiment: [
        { name: "Positive", value: 68, color: "hsl(142, 76%, 36%)" },
        { name: "Neutral", value: 24, color: "hsl(45, 93%, 47%)" },
        { name: "Negative", value: 8, color: "hsl(0, 84%, 60%)" },
      ],
      recentPosts: [
        {
          id: 1,
          image:
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
          caption: "Introducing our new seasonal blend! ☕✨ #NewFlavor",
          likes: 45200,
          comments: 892,
          shares: 234,
          date: "2 hours ago",
        },
        {
          id: 2,
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
          caption: "Behind the scenes at our roastery 🌟",
          likes: 38900,
          comments: 654,
          shares: 189,
          date: "1 day ago",
        },
        {
          id: 3,
          image:
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop",
          caption: "Perfect morning vibes ☀️☕",
          likes: 52100,
          comments: 1023,
          shares: 312,
          date: "2 days ago",
        },
      ],
    },
    Facebook: {
      posts: [
        {
          month: "Jan",
          posts: 38,
          likes: 98000,
          shares: 6700,
          comments: 8900,
          saves: 5400,
        },
        {
          month: "Feb",
          posts: 40,
          likes: 102000,
          shares: 7100,
          comments: 9300,
          saves: 5700,
        },
        {
          month: "Mar",
          posts: 42,
          likes: 108000,
          shares: 7600,
          comments: 9800,
          saves: 6100,
        },
        {
          month: "Apr",
          posts: 39,
          likes: 104000,
          shares: 7300,
          comments: 9500,
          saves: 5900,
        },
        {
          month: "May",
          posts: 41,
          likes: 106000,
          shares: 7800,
          comments: 9700,
          saves: 6000,
        },
        {
          month: "Jun",
          posts: 44,
          likes: 112000,
          shares: 8200,
          comments: 10200,
          saves: 6400,
        },
      ],
      sentiment: [
        { name: "Positive", value: 62, color: "hsl(142, 76%, 36%)" },
        { name: "Neutral", value: 28, color: "hsl(45, 93%, 47%)" },
        { name: "Negative", value: 10, color: "hsl(0, 84%, 60%)" },
      ],
      recentPosts: [
        {
          id: 1,
          image:
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop",
          caption: "Join us for our community event this weekend! 🎉",
          likes: 28400,
          comments: 567,
          shares: 892,
          date: "3 hours ago",
        },
        {
          id: 2,
          image:
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=400&fit=crop",
          caption: "Celebrating our amazing baristas! 👏",
          likes: 31200,
          comments: 623,
          shares: 445,
          date: "1 day ago",
        },
      ],
    },
    Twitter: {
      posts: [
        {
          month: "Jan",
          posts: 95,
          likes: 45000,
          shares: 12000,
          comments: 8900,
          saves: 3200,
        },
        {
          month: "Feb",
          posts: 98,
          likes: 47000,
          shares: 12500,
          comments: 9200,
          saves: 3400,
        },
        {
          month: "Mar",
          posts: 102,
          likes: 51000,
          shares: 13200,
          comments: 9800,
          saves: 3700,
        },
        {
          month: "Apr",
          posts: 99,
          likes: 48000,
          shares: 12800,
          comments: 9400,
          saves: 3500,
        },
        {
          month: "May",
          posts: 101,
          likes: 49000,
          shares: 13000,
          comments: 9600,
          saves: 3600,
        },
        {
          month: "Jun",
          posts: 105,
          likes: 53000,
          shares: 13800,
          comments: 10200,
          saves: 3900,
        },
      ],
      sentiment: [
        { name: "Positive", value: 58, color: "hsl(142, 76%, 36%)" },
        { name: "Neutral", value: 32, color: "hsl(45, 93%, 47%)" },
        { name: "Negative", value: 10, color: "hsl(0, 84%, 60%)" },
      ],
      recentPosts: [
        {
          id: 1,
          image: "",
          caption:
            "Hot take: Our new blend is the best thing to happen to mornings since sunrise ☀️☕",
          likes: 8900,
          comments: 234,
          shares: 567,
          date: "1 hour ago",
        },
        {
          id: 2,
          image: "",
          caption:
            "Sustainability update: We've saved 2M plastic cups this quarter! 🌍♻️",
          likes: 12400,
          comments: 445,
          shares: 892,
          date: "5 hours ago",
        },
      ],
    },
    LinkedIn: {
      posts: [
        {
          month: "Jan",
          posts: 18,
          likes: 12000,
          shares: 3400,
          comments: 2100,
          saves: 1800,
        },
        {
          month: "Feb",
          posts: 19,
          likes: 12500,
          shares: 3600,
          comments: 2200,
          saves: 1900,
        },
        {
          month: "Mar",
          posts: 21,
          likes: 13200,
          shares: 3900,
          comments: 2400,
          saves: 2100,
        },
        {
          month: "Apr",
          posts: 20,
          likes: 12800,
          shares: 3700,
          comments: 2300,
          saves: 2000,
        },
        {
          month: "May",
          posts: 22,
          likes: 13500,
          shares: 4000,
          comments: 2500,
          saves: 2200,
        },
        {
          month: "Jun",
          posts: 24,
          likes: 14200,
          shares: 4300,
          comments: 2700,
          saves: 2400,
        },
      ],
      sentiment: [
        { name: "Positive", value: 75, color: "hsl(142, 76%, 36%)" },
        { name: "Neutral", value: 20, color: "hsl(45, 93%, 47%)" },
        { name: "Negative", value: 5, color: "hsl(0, 84%, 60%)" },
      ],
      recentPosts: [
        {
          id: 1,
          image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
          caption:
            "We're hiring! Join our team of innovators. 200+ positions open.",
          likes: 3400,
          comments: 189,
          shares: 567,
          date: "2 days ago",
        },
      ],
    },
    YouTube: {
      posts: [
        {
          month: "Jan",
          posts: 8,
          likes: 28000,
          shares: 4200,
          comments: 3400,
          saves: 5600,
        },
        {
          month: "Feb",
          posts: 9,
          likes: 31000,
          shares: 4600,
          comments: 3700,
          saves: 6100,
        },
        {
          month: "Mar",
          posts: 10,
          likes: 34000,
          shares: 5100,
          comments: 4100,
          saves: 6700,
        },
        {
          month: "Apr",
          posts: 9,
          likes: 32000,
          shares: 4800,
          comments: 3900,
          saves: 6400,
        },
        {
          month: "May",
          posts: 11,
          likes: 36000,
          shares: 5400,
          comments: 4300,
          saves: 7100,
        },
        {
          month: "Jun",
          posts: 12,
          likes: 39000,
          shares: 5800,
          comments: 4700,
          saves: 7600,
        },
      ],
      sentiment: [
        { name: "Positive", value: 72, color: "hsl(142, 76%, 36%)" },
        { name: "Neutral", value: 22, color: "hsl(45, 93%, 47%)" },
        { name: "Negative", value: 6, color: "hsl(0, 84%, 60%)" },
      ],
      recentPosts: [
        {
          id: 1,
          image:
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop",
          caption: "How We Source Our Coffee Beans | Behind the Scenes",
          likes: 12400,
          comments: 567,
          shares: 234,
          date: "3 days ago",
        },
      ],
    },
  },
};

export default function SocialMediaSentimentTab({
  companySlug,
}: SocialMediaSentimentTabProps) {
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const currentPlatformData =
    socialMediaData.platformMetrics[
      selectedPlatform as keyof typeof socialMediaData.platformMetrics
    ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Total Followers
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-foreground">
              {formatNumber(socialMediaData.overview.totalFollowers)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-accent/10 via-card to-card shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/30">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Engagement Rate
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-foreground">
              {socialMediaData.overview.engagementRate}%
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Average across platforms
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Post Reach
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-foreground">
              {formatNumber(socialMediaData.overview.postReach)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Monthly average reach
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Overview Table */}
      <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Platform Overview</CardTitle>
          <p className="text-sm text-muted-foreground">
            Performance metrics across different social media platforms
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                    Platform
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                    Followers
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                    Total Posts
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {socialMediaData.platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <tr
                      key={platform.name}
                      className="border-b border-border/50 hover:bg-accent/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${platform.color}15` }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{ color: platform.color }}
                            />
                          </div>
                          <span className="font-semibold text-foreground">
                            {platform.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">
                        {formatNumber(platform.followers)}
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">
                        {platform.totalPosts.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 font-semibold text-sm">
                          <TrendingUp className="h-3 w-3" />
                          {platform.growth}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Growth Chart */}
      <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Social Media Growth</CardTitle>
          <p className="text-sm text-muted-foreground">
            Follower growth across platforms over the last 6 months
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={socialMediaData.growthData}>
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
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip
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
                iconType="line"
                formatter={(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              />
              {socialMediaData.platforms.map((platform) => (
                <Line
                  key={platform.name}
                  type="monotone"
                  dataKey={platform.name}
                  stroke={platform.color}
                  strokeWidth={2}
                  dot={{ fill: platform.color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Platform Selector */}
      <div className="flex flex-wrap gap-3">
        {socialMediaData.platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => setSelectedPlatform(platform.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all ${
                selectedPlatform === platform.name
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105"
                  : "bg-card border border-border/60 text-foreground hover:border-primary/50"
              }`}
            >
              <Icon className="h-5 w-5" />
              {platform.name}
            </button>
          );
        })}
      </div>

      {/* Platform-Specific Metrics */}
      <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            {selectedPlatform} Performance
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Detailed engagement metrics for {selectedPlatform}
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={currentPlatformData.posts}>
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
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip
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
                dataKey="posts"
                fill="hsl(var(--chart-1))"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="likes"
                fill="hsl(var(--chart-2))"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="shares"
                fill="hsl(var(--chart-3))"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="comments"
                fill="hsl(var(--chart-4))"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="saves"
                fill="hsl(var(--chart-5))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Platform-Specific Sentiment */}
      <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            {selectedPlatform} Sentiment Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Customer sentiment breakdown for {selectedPlatform}
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={currentPlatformData.sentiment}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {currentPlatformData.sentiment.map((entry, index) => (
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

      {/* Recent Posts */}
      <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            Recent {selectedPlatform} Posts
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Latest posts from {selectedPlatform}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPlatformData.recentPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-border/60 overflow-hidden bg-gradient-to-br from-card to-accent/5 hover:shadow-lg transition-all"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {formatNumber(post.likes)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {formatNumber(post.comments)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-4 w-4" />
                      {formatNumber(post.shares)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
