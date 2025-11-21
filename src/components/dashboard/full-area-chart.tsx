"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "Competitor activity trends across social media and websites"

const chartData = [
  { date: "2024-04-01", social: 182, website: 135 },
  { date: "2024-04-04", social: 242, website: 178 },
  { date: "2024-04-07", social: 318, website: 205 },
  { date: "2024-04-10", social: 264, website: 198 },
  { date: "2024-04-13", social: 336, website: 214 },
  { date: "2024-04-16", social: 358, website: 228 },
  { date: "2024-04-19", social: 243, website: 176 },
  { date: "2024-04-22", social: 224, website: 162 },
  { date: "2024-04-25", social: 215, website: 188 },
  { date: "2024-04-28", social: 252, website: 210 },
  { date: "2024-05-01", social: 265, website: 190 },
  { date: "2024-05-04", social: 342, website: 224 },
  { date: "2024-05-07", social: 388, website: 255 },
  { date: "2024-05-10", social: 293, website: 214 },
  { date: "2024-05-13", social: 268, website: 198 },
  { date: "2024-05-16", social: 358, website: 236 },
  { date: "2024-05-19", social: 235, website: 172 },
  { date: "2024-05-22", social: 212, website: 168 },
  { date: "2024-05-25", social: 301, website: 215 },
  { date: "2024-05-28", social: 233, website: 184 },
  { date: "2024-05-31", social: 278, website: 206 },
  { date: "2024-06-03", social: 303, website: 218 },
  { date: "2024-06-06", social: 329, website: 240 },
  { date: "2024-06-09", social: 348, website: 252 },
  { date: "2024-06-12", social: 372, website: 268 },
  { date: "2024-06-15", social: 307, website: 232 },
  { date: "2024-06-18", social: 286, website: 220 },
  { date: "2024-06-21", social: 269, website: 205 },
  { date: "2024-06-24", social: 312, website: 228 },
  { date: "2024-06-27", social: 338, website: 244 },
  { date: "2024-06-30", social: 326, website: 238 },
] satisfies Array<{ date: string; social: number; website: number }>

const chartConfig = {
  social: {
    label: "Social Media",
    color: "hsl(var(--chart-1))",
  },
  website: {
    label: "Website Activity",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function GuestTrafficChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="rounded-3xl border border-border/60 bg-[var(--card)]/90 shadow-sm backdrop-blur pt-0">
      <CardHeader className="flex flex-col gap-4 rounded-t-3xl border-b border-border/60 bg-[var(--card)]/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardDescription className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            Activity Trends
          </CardDescription>
          <CardTitle className="text-2xl font-semibold text-[var(--card-foreground)]">
            Social Media vs Website Activity
          </CardTitle>
          <p className="text-sm text-[var(--muted-foreground)]">
            Track competitor engagement across social platforms and website updates
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-xl bg-[var(--card)] text-[var(--card-foreground)]"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last quarter" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border border-border/60 bg-[var(--card)]/95 backdrop-blur">
            <SelectItem value="90d" className="rounded-lg text-[var(--card-foreground)]">
              Last quarter
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg text-[var(--card-foreground)]">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg text-[var(--card-foreground)]">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pb-6 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillSocial" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-social)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-social)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillWebsite" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-website)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-website)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="hsl(var(--muted) / 0.4)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="website"
                type="natural"
                fill="url(#fillWebsite)"
                stroke="var(--color-website)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="social"
                type="natural"
                fill="url(#fillSocial)"
                stroke="var(--color-social)"
                strokeWidth={2}
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
