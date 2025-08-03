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
import { ChartRow } from "../Auxiliar/TiposEspeciais"

export const description = "Gráfico de Registros"

export function LogGraficBar({ dados }: { dados: ChartRow[] }) {

    if (dados[0] === undefined){ return (null)};

    console.log(JSON.stringify(dados))
    const niveis = Object.keys(dados[0]).filter(k => k !== "estampaTempo");
    type ChartKeys = typeof niveis[number];

    const chartConfig:  Record<ChartKeys | "views", { label: string; color?: string }> = {
        views: { label: "Page Views" },
        global: { label: "Global", color: "#4682B4" },
        ...Object.fromEntries(niveis.map(n => [n, { label: n.charAt(0).toUpperCase() + n.slice(1).toLowerCase(), color: "#4682B4" }]))
      } satisfies ChartConfig;
      
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("global")

  const total = React.useMemo(() => (
    {
      global: dados.reduce((acc, curr) => acc + curr.global, 0),
      ...Object.fromEntries(
        niveis.map(n => [n, dados.reduce((acc, curr) => acc + Number(curr[n]), 0)])
      )
    }),
    []
  )

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Frequência de registros</CardTitle>
          <CardDescription>
            Total de registros nos últimos 3 meses
          </CardDescription>
        </div>
        <div className="flex">
          {niveis.map((key) => {
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
            data={dados}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="estampaTempo"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-BR", {
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
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} radius={3} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
