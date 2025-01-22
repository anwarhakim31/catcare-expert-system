"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChartIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function PieChartComponent({
  modus,
}: {
  modus: {
    disease: string;
    modus: string;
    fill: string;
  }[];
}) {
  const chartConfig = modus.reduce(
    (acc: { [key: string]: { label: string; color: string } }, disease) => {
      acc[disease.disease] = {
        label: disease.disease,
        color: disease.fill,
      };
      return acc;
    },
    {}
  ) satisfies ChartConfig;

  return (
    <div className=" col-span-6 shadow-md border-t mt-6 px-2.5 py-4">
      <div className="items-center pb-0">
        <div className="flex items-center gap-2">
          <PieChartIcon strokeWidth={1.5} size={18} />
          <h3 className="font-medium text-sm">Modus Penyakit Kucing</h3>
        </div>
        <div className="">
          <Separator className="mt-2" />
        </div>
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-[175px] w-full px-0">
          <PieChart className="">
            <ChartTooltip
              content={<ChartTooltipContent nameKey="modus" hideLabel />}
            />
            <Pie
              data={modus}
              dataKey="modus"
              labelLine={false}
              fill="#0f0f0f"
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="#0f0f0f"
                  >
                    {payload.modus}
                  </text>
                );
              }}
              nameKey="disease"
            />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
