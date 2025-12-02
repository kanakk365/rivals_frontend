"use client";

import { CartesianGrid, Line, LineChart, XAxis, Customized } from "recharts";
import { useCallback, useState } from "react";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface GrowthDataPoint {
  month: string;
  Instagram: number;
  Facebook: number;
  Twitter: number;
  LinkedIn: number;
  YouTube: number;
}

interface SocialMediaGrowthChartProps {
  data: GrowthDataPoint[];
  platforms: Array<{
    name: string;
    color: string;
  }>;
}

interface ChartDataPoint {
  x?: number;
  y?: number;
  value?: number | string;
  payload?: Record<string, unknown>;
}

interface ChartLineData {
  item: {
    props: {
      dataKey: string;
    };
  };
  props: {
    points: ChartDataPoint[];
  };
}

interface CustomizedChartProps {
  formattedGraphicalItems?: ChartLineData[];
}

interface LineConfig {
  name: string;
  splitIndex?: number;
  dashPattern?: number[];
  curveAdjustment?: number;
}

interface UseDynamicDasharrayProps {
  lineConfigs?: LineConfig[];
  splitIndex?: number;
  defaultDashPattern?: number[];
  curveAdjustment?: number;
}

type LineDasharray = {
  name: string;
  strokeDasharray: string;
}[];

export function useDynamicDasharray({
  lineConfigs = [],
  splitIndex = -2,
  defaultDashPattern: dashPattern = [5, 3],
  curveAdjustment = 1,
}: UseDynamicDasharrayProps): [
  (props: CustomizedChartProps) => null,
  LineDasharray
] {
  const [lineDasharrays, setLineDasharrays] = useState<LineDasharray>([]);

  const DasharrayCalculator = useCallback(
    (props: CustomizedChartProps): null => {
      const chartLines = props?.formattedGraphicalItems;
      const newLineDasharrays: LineDasharray = [];

      const calculatePathLength = (points: ChartDataPoint[]) => {
        return (
          points?.reduce((acc, point, index) => {
            if (index === 0) return acc;

            const prevPoint = points[index - 1];

            const dx = (point.x || 0) - (prevPoint.x || 0);
            const dy = (point.y || 0) - (prevPoint.y || 0);

            acc += Math.sqrt(dx * dx + dy * dy);
            return acc;
          }, 0) || 0
        );
      };

      chartLines?.forEach((line) => {
        const points = line?.props?.points;
        const totalLength = calculatePathLength(points || []);

        const lineName = line?.item?.props?.dataKey;
        const lineConfig = lineConfigs?.find(
          (config) => config?.name === lineName
        );
        const lineSplitIndex = lineConfig?.splitIndex ?? splitIndex;
        const dashedSegment = points?.slice(lineSplitIndex);
        const dashedLength = calculatePathLength(dashedSegment || []);

        if (!totalLength || !dashedLength) return;

        const solidLength = totalLength - dashedLength;
        const curveCorrectionFactor =
          lineConfig?.curveAdjustment ?? curveAdjustment;
        const adjustment = (solidLength * curveCorrectionFactor) / 100;
        const solidDasharrayPart = solidLength + adjustment;

        const targetDashPattern = lineConfig?.dashPattern || dashPattern;
        const patternSegmentLength =
          (targetDashPattern?.[0] || 0) + (targetDashPattern?.[1] || 0) || 1;
        const repetitions = Math.ceil(dashedLength / patternSegmentLength);
        const dashedPatternSegments = Array.from({ length: repetitions }, () =>
          targetDashPattern.join(" ")
        );

        const finalDasharray = `${solidDasharrayPart} ${dashedPatternSegments.join(
          " "
        )}`;
        newLineDasharrays.push({
          name: lineName!,
          strokeDasharray: finalDasharray,
        });
      });

      if (
        JSON.stringify(newLineDasharrays) !== JSON.stringify(lineDasharrays)
      ) {
        setTimeout(() => setLineDasharrays(newLineDasharrays), 0);
      }

      return null;
    },
    [splitIndex, curveAdjustment, lineConfigs, dashPattern, lineDasharrays]
  );

  return [DasharrayCalculator, lineDasharrays];
}

export function SocialMediaGrowthChart({
  data,
  platforms,
}: SocialMediaGrowthChartProps) {
  const [DasharrayCalculator, lineDasharrays] = useDynamicDasharray({
    splitIndex: data.length - 2,
  });

  const chartConfig: ChartConfig = platforms.reduce((acc, platform) => {
    acc[platform.name] = {
      label: platform.name,
      color: platform.color,
    };
    return acc;
  }, {} as ChartConfig);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="rounded-3xl border border-border/60 bg-card/90 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          Social Media Growth
          <Badge
            variant="outline"
            className="text-green-500 bg-green-500/10 border-none ml-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>15.2%</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          Follower growth across platforms over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-80 w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {platforms.map((platform) => (
              <Line
                key={platform.name}
                dataKey={platform.name}
                type="linear"
                stroke={platform.color}
                dot={{
                  r: 2.5,
                  fill: platform.color,
                }}
                strokeDasharray={
                  lineDasharrays.find((line) => line.name === platform.name)
                    ?.strokeDasharray || "0 0"
                }
              />
            ))}
            <Customized component={DasharrayCalculator} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
