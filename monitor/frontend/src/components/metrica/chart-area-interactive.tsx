"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", ms: 222, quant: 150 },
  { date: "2024-04-02", ms: 97, quant: 180 },
  { date: "2024-04-03", ms: 167, quant: 120 },
  { date: "2024-04-04", ms: 242, quant: 260 },
  { date: "2024-04-05", ms: 373, quant: 290 },
  { date: "2024-04-06", ms: 301, quant: 340 },
  { date: "2024-04-07", ms: 245, quant: 180 },
  { date: "2024-04-08", ms: 409, quant: 320 },
  { date: "2024-04-09", ms: 59, quant: 110 },
  { date: "2024-04-10", ms: 261, quant: 190 },
  { date: "2024-04-11", ms: 327, quant: 350 },
  { date: "2024-04-12", ms: 292, quant: 210 },
  { date: "2024-04-13", ms: 342, quant: 380 },
  { date: "2024-04-14", ms: 137, quant: 220 },
  { date: "2024-04-15", ms: 120, quant: 170 },
  { date: "2024-04-16", ms: 138, quant: 190 },
  { date: "2024-04-17", ms: 446, quant: 360 },
  { date: "2024-04-18", ms: 364, quant: 410 },
  { date: "2024-04-19", ms: 243, quant: 180 },
  { date: "2024-04-20", ms: 89, quant: 150 },
  { date: "2024-04-21", ms: 137, quant: 200 },
  { date: "2024-04-22", ms: 224, quant: 170 },
  { date: "2024-04-23", ms: 138, quant: 230 },
  { date: "2024-04-24", ms: 387, quant: 290 },
  { date: "2024-04-25", ms: 215, quant: 250 },
  { date: "2024-04-26", ms: 75, quant: 130 },
  { date: "2024-04-27", ms: 383, quant: 420 },
  { date: "2024-04-28", ms: 122, quant: 180 },
  { date: "2024-04-29", ms: 315, quant: 240 },
  { date: "2024-04-30", ms: 454, quant: 380 },
  { date: "2024-05-01", ms: 165, quant: 220 },
  { date: "2024-05-02", ms: 293, quant: 310 },
  { date: "2024-05-03", ms: 247, quant: 190 },
  { date: "2024-05-04", ms: 385, quant: 420 },
  { date: "2024-05-05", ms: 481, quant: 390 },
  { date: "2024-05-06", ms: 498, quant: 520 },
  { date: "2024-05-07", ms: 388, quant: 300 },
  { date: "2024-05-08", ms: 149, quant: 210 },
  { date: "2024-05-09", ms: 227, quant: 180 },
  { date: "2024-05-10", ms: 293, quant: 330 },
  { date: "2024-05-11", ms: 335, quant: 270 },
  { date: "2024-05-12", ms: 197, quant: 240 },
  { date: "2024-05-13", ms: 197, quant: 160 },
  { date: "2024-05-14", ms: 448, quant: 490 },
  { date: "2024-05-15", ms: 473, quant: 380 },
  { date: "2024-05-16", ms: 338, quant: 400 },
  { date: "2024-05-17", ms: 499, quant: 420 },
  { date: "2024-05-18", ms: 315, quant: 350 },
  { date: "2024-05-19", ms: 235, quant: 180 },
  { date: "2024-05-20", ms: 177, quant: 230 },
  { date: "2024-05-21", ms: 82, quant: 140 },
  { date: "2024-05-22", ms: 81, quant: 120 },
  { date: "2024-05-23", ms: 252, quant: 290 },
  { date: "2024-05-24", ms: 294, quant: 220 },
  { date: "2024-05-25", ms: 201, quant: 250 },
  { date: "2024-05-26", ms: 213, quant: 170 },
  { date: "2024-05-27", ms: 420, quant: 460 },
  { date: "2024-05-28", ms: 233, quant: 190 },
  { date: "2024-05-29", ms: 78, quant: 130 },
  { date: "2024-05-30", ms: 340, quant: 280 },
  { date: "2024-05-31", ms: 178, quant: 230 },
  { date: "2024-06-01", ms: 178, quant: 200 },
  { date: "2024-06-02", ms: 470, quant: 410 },
  { date: "2024-06-03", ms: 103, quant: 160 },
  { date: "2024-06-04", ms: 439, quant: 380 },
  { date: "2024-06-05", ms: 88, quant: 140 },
  { date: "2024-06-06", ms: 294, quant: 250 },
  { date: "2024-06-07", ms: 323, quant: 370 },
  { date: "2024-06-08", ms: 385, quant: 320 },
  { date: "2024-06-09", ms: 438, quant: 480 },
  { date: "2024-06-10", ms: 155, quant: 200 },
  { date: "2024-06-11", ms: 92, quant: 150 },
  { date: "2024-06-12", ms: 492, quant: 420 },
  { date: "2024-06-13", ms: 81, quant: 130 },
  { date: "2024-06-14", ms: 426, quant: 380 },
  { date: "2024-06-15", ms: 307, quant: 350 },
  { date: "2024-06-16", ms: 371, quant: 310 },
  { date: "2024-06-17", ms: 475, quant: 520 },
  { date: "2024-06-18", ms: 107, quant: 170 },
  { date: "2024-06-19", ms: 341, quant: 290 },
  { date: "2024-06-20", ms: 408, quant: 450 },
  { date: "2024-06-21", ms: 169, quant: 210 },
  { date: "2024-06-22", ms: 317, quant: 270 },
  { date: "2024-06-23", ms: 480, quant: 530 },
  { date: "2024-06-24", ms: 132, quant: 180 },
  { date: "2024-06-25", ms: 141, quant: 190 },
  { date: "2024-06-26", ms: 434, quant: 380 },
  { date: "2024-06-27", ms: 448, quant: 490 },
  { date: "2024-06-28", ms: 149, quant: 200 },
  { date: "2024-06-29", ms: 103, quant: 160 },
  { date: "2024-06-30", ms: 446, quant: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  ms: {
    label: "Tempo em Milisegundos",
    color: "var(--chart-2)",
  },
  quant: {
    label: "Quantidade de Requisições por dia",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarInteractive(){


    const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("ms")

    const total = React.useMemo(
    () => ({
      ms: chartData.reduce((acc, curr) => acc + curr.ms, 0),
      quant: chartData.reduce((acc, curr) => acc + curr.quant, 0),
    }),
    []
  )

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["ms", "quant"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
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
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
