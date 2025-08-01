"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "An interactive area chart"

const chartData = [
    {
        "estampaTempo": "2025-07-06",
        "INFO": 25,
        "WARN": 1
    },
    {
        "estampaTempo": "2025-07-07",
        "INFO": 21,
        "WARN": 0,
        "ERROR": 6
    },
    {
        "estampaTempo": "2025-07-08",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-09",
        "INFO": 25,
        "WARN": 1
    },
    {
        "estampaTempo": "2025-07-10",
        "INFO": 25,
        "WARN": 1
    },
    {
        "estampaTempo": "2025-07-11",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-12",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-13",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-14",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-15",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-16",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-17",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-18",
        "INFO": 25,
        "WARN": 1
    },
    {
        "estampaTempo": "2025-07-19",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-20",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-21",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-22",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-23",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-24",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-25",
        "INFO": 25,
        "WARN": 1
    },
    {
        "estampaTempo": "2025-07-26",
        "INFO": 25,
        "WARN": 1
    },
    {
        "estampaTempo": "2025-07-27",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-28",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-29",
        "INFO": 0,
        "WARN": 0
    },
    {
        "estampaTempo": "2025-07-30",
        "INFO": 50,
        "WARN": 2
    },
    {
        "estampaTempo": "2025-07-31",
        "INFO": 25,
        "WARN": 1
    }
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  "INFO": {
    label: "Information",
    color: "#3b82f6",
  },
  "WARN": {
    label: "Warning",
    color: "#eab308",
  },
  "ERROR": {
    label: "Error",
    color: "#ef4444",
  },
} satisfies ChartConfig

export function GraficoLogs() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.estampaTempo)
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
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillINFO" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-INFO)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-INFO)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillWARN" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-WARN)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-WARN)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillERROR" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ERROR)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ERROR)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="INFO"
              type="natural"
              fill="url(#fillINFO)"
              stroke="var(--color-INFO)"
              stackId="a"
            />
            <Area
              dataKey="WARN"
              type="natural"
              fill="url(#fillWARN)"
              stroke="var(--color-WARN)"
              stackId="a"
            />
            <Area
              dataKey="ERROR"
              type="natural"
              fill="url(#fillERROR)"
              stroke="var(--color-ERROR)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
