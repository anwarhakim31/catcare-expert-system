"use client";

import { AreaChartIcon } from "lucide-react";
import { CartesianGrid, XAxis, LineChart, Line, YAxis } from "recharts";

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
import { Separator } from "@/components/ui/separator";

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChartComp({
  statistic,
}: {
  statistic: { month: string; count: number }[];
}) {
  return (
    <Card className="rounded-md shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AreaChartIcon strokeWidth={1.5} size={18} />
          <h3 className="font-medium text-sm">Performa Diagnosis</h3>
        </CardTitle>
        <CardDescription className="">
          <Separator className="mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={statistic}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              width={25}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke={chartConfig.count.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
        <p className="text-xs mt-8 text-center">3 bulan terakhir</p>
      </CardContent>
    </Card>
  );
}
