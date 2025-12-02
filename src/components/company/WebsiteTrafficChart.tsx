"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface TrafficData {
  month: string;
  visitors: number;
  pageViews: number;
  bounceRate: number;
}

interface WebsiteTrafficChartProps {
  data: TrafficData[];
}

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
  pageViews: {
    label: "Page Views",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function WebsiteTrafficChart({ data }: WebsiteTrafficChartProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm backdrop-blur pt-0">
      <CardHeader className="flex flex-col gap-4 rounded-t-3xl border-b border-border/60 bg-card/80 px-6 py-5">
        <div className="space-y-1">
          <CardDescription className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Traffic Trend
          </CardDescription>
          <CardTitle className="text-2xl font-semibold text-card-foreground">
            Website Traffic & Engagement
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Website traffic and engagement over the last 6 months
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-6 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-visitors)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-visitors)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-pageViews)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-pageViews)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="hsl(var(--muted) / 0.4)"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => value}
                    indicator="dot"
                    formatter={(value) => formatNumber(Number(value))}
                  />
                }
              />
              <Area
                dataKey="pageViews"
                type="natural"
                fill="url(#fillPageViews)"
                stroke="var(--color-pageViews)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="visitors"
                type="natural"
                fill="url(#fillVisitors)"
                stroke="var(--color-visitors)"
                strokeWidth={2}
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
