"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { z } from "zod"
import React from "react"
import { EntradaMetricaDTO } from "@/dto/metrica"
import { getListaMSMetrica } from "@/services/MetricaService"

export const description = "Requisições x Milissegundo"

export const schema = z.object({
  estampaTempo: z.string(),
  milissegundos: z.number(),
})

const chartConfig = {
  milissegundos: {
    label: "milissegundos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function GraficoMSReq({ servicoNome, rotaNome }: { servicoNome: string | null, rotaNome: string | null }) {
  const [dadosQR, setDadosQR] = React.useState<z.infer<typeof schema>[]>([])

  React.useEffect(() => {
    async function fetchData() {
      try {
        if (!servicoNome || !rotaNome) return
        const span: EntradaMetricaDTO= {servico: servicoNome, rota: rotaNome};
        const resposta = await getListaMSMetrica(span)
        console.log(resposta);
        setDadosQR(resposta)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }

    fetchData()
  }, [servicoNome, rotaNome])


  return (
    <Card>
      <CardHeader>
        <CardTitle>{description}</CardTitle>
        <CardDescription>Rota: {rotaNome} </CardDescription>
        <CardDescription>Serviço: {servicoNome}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={dadosQR}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="estampaTempo"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 16)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="milissegundos" fill="#4682B4" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}
//<div className="flex gap-2 leading-none font-medium">
//Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//</div>
//<div className="text-muted-foreground leading-none">
//Showing total visitors for the last 6 months
//</div>
