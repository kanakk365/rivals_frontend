"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SentimentData {
  name: string;
  value: number;
  color: string;
}

interface SentimentDonutChartProps {
  data: SentimentData[];
}

const chartConfig = {
  value: {
    label: "Sentiment",
  },
  positive: {
    label: "Positive",
    color: "#64b5f6",
  },
  neutral: {
    label: "Neutral",
    color: "#a48fff",
  },
  negative: {
    label: "Negative",
    color: "#ff79c6",
  },
} satisfies ChartConfig;

export function SentimentDonutChart({ data }: SentimentDonutChartProps) {
  const chartData = data.map((item) => ({
    sentiment: item.name.toLowerCase(),
    value: item.value,
    fill: item.color,
  }));

  const totalSentiment = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col rounded-3xl border border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">Overall Sentiment</CardTitle>
        <CardDescription>
          Customer sentiment analysis across all platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="sentiment"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSentiment}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
