"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import type { RevenueQuarter, RevenueSummary } from "@/store/revenueStore";

interface ClippedAreaChartProps {
  quarters?: RevenueQuarter[];
  summary?: RevenueSummary | null;
  symbol?: string;
  isLoading?: boolean;
  error?: string | null;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  net_income: {
    label: "Net Income",
    color: "hsl(142, 76%, 36%)",
  },
} satisfies ChartConfig;

function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

function formatAxisValue(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)}M`;
  }
  return `${(value / 1_000).toFixed(0)}K`;
}

export function ClippedAreaChart({
  quarters,
  summary,
  symbol,
  isLoading,
  error,
}: ClippedAreaChartProps) {
  // Transform quarters data for the chart (reverse to show oldest first / left to right)
  const chartData = quarters
    ? [...quarters].reverse().map((q) => ({
        label: `${q.period} ${q.fiscal_year}`,
        revenue: q.revenue,
        net_income: q.net_income,
        gross_profit: q.gross_profit,
        operating_income: q.operating_income,
        eps: q.eps,
        date: q.date,
      }))
    : [];

  // Calculate revenue growth (newest vs oldest quarter)
  const revenueGrowth =
    chartData.length >= 2
      ? (
          ((chartData[chartData.length - 1].revenue - chartData[0].revenue) /
            chartData[0].revenue) *
          100
        ).toFixed(1)
      : null;

  const isPositiveGrowth = revenueGrowth
    ? parseFloat(revenueGrowth) >= 0
    : true;

  if (isLoading) {
    return (
      <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Revenue Overview</CardTitle>
          <CardDescription>Quarterly income statement data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-80 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Loader2 className="relative h-10 w-10 text-primary animate-spin" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Loading revenue data...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !quarters || quarters.length === 0) {
    return (
      <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Revenue Overview</CardTitle>
          <CardDescription>Quarterly income statement data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-80 text-center">
            <p className="text-sm text-muted-foreground">
              {error || "No revenue data available"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with summary metrics */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Revenue Overview
            {symbol && (
              <Badge variant="outline" className="text-xs font-mono">
                {symbol}
              </Badge>
            )}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Last {quarters.length} quarters of income data
          </p>
        </div>
        {revenueGrowth && (
          <Badge
            variant="secondary"
            className={`${
              isPositiveGrowth
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-red-500/10 text-red-600 border-red-500/20"
            }`}
          >
            {isPositiveGrowth ? (
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
            )}
            <span>
              {isPositiveGrowth ? "+" : ""}
              {revenueGrowth}%
            </span>
          </Badge>
        )}
      </div>

      {/* Summary metrics row */}
      {summary && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-xl bg-accent/5 border border-border/40">
            <p className="text-xs text-muted-foreground font-medium">
              Total Revenue (4Q)
            </p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(summary.total_revenue_4q)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-accent/5 border border-border/40">
            <p className="text-xs text-muted-foreground font-medium">
              Net Income (4Q)
            </p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(summary.total_net_income_4q)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-accent/5 border border-border/40">
            <p className="text-xs text-muted-foreground font-medium">
              Avg EPS (4Q)
            </p>
            <p className="text-lg font-bold text-foreground">
              ${summary.average_eps_4q.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Side-by-side: Table on the left, Chart on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Table */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quarterly Breakdown</CardTitle>
            <CardDescription>
              Detailed financial metrics per quarter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-accent/5 border-b border-border/40">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Quarter
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Gross Profit
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Net Income
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      EPS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quarters.map((q, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-border/20 last:border-0 hover:bg-accent/5 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-foreground whitespace-nowrap">
                        {q.period} {q.fiscal_year}
                        {idx === 0 && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase">
                            Latest
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-foreground font-medium">
                        {formatCurrency(q.revenue)}
                      </td>
                      <td className="py-3 px-4 text-right text-foreground">
                        {formatCurrency(q.gross_profit)}
                      </td>
                      <td
                        className={`py-3 px-4 text-right font-medium ${
                          q.net_income >= 0
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {formatCurrency(q.net_income)}
                      </td>
                      <td className="py-3 px-4 text-right text-foreground">
                        ${q.eps.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Revenue Trend</CardTitle>
            <CardDescription>
              Revenue &amp; Net Income over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-80 w-full" config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={11}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={formatAxisValue}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    padding: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: number, name: string) => {
                    const label =
                      name === "revenue"
                        ? "Revenue"
                        : name === "net_income"
                          ? "Net Income"
                          : name;
                    return [formatCurrency(value), label];
                  }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <defs>
                  <linearGradient
                    id="gradient-revenue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
                  <linearGradient
                    id="gradient-net-income"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(142, 76%, 36%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(142, 76%, 36%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="url(#gradient-revenue)"
                  fillOpacity={1}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                />
                <Area
                  dataKey="net_income"
                  type="monotone"
                  fill="url(#gradient-net-income)"
                  fillOpacity={1}
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "hsl(142, 76%, 36%)" }}
                />
                <span className="text-muted-foreground">Net Income</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
