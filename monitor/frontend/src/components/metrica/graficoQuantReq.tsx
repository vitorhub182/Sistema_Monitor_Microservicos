"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { getListaQuantMetrica } from "@/services/MetricaService"
import { DataGrafico } from "./DataFormat"

export const description = "Requisições x Tempo"

export const schema = z.object({
  estampaTempo: z.string(),
  quant: z.number(),
})

const chartConfig = {
  quant: {
    label: "quant",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function GraficoQuantReq({ servicoNome, rotaNome }: { servicoNome: string | null, rotaNome: string | null }) {
  const [dadosQR, setDadosQR] = React.useState<z.infer<typeof schema>[]>([])

  React.useEffect(() => {
    async function fetchData() {
      try {
        if (!servicoNome || !rotaNome) return
        const span: EntradaMetricaDTO= {servico: servicoNome, rota: rotaNome};
        const resposta = await getListaQuantMetrica(span)
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
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="estampaTempo"
              tickLine={true}
              tickMargin={5}
              hide={false}
              axisLine={true}
              orientation={"bottom"}
              type={"category"}
              padding={{ left: 5, right: 5 }}
              tickFormatter={(value) =>
                {
                  return DataGrafico(value);
                } 
              }       
            />
            <YAxis
              dataKey={"quant"}
              tickLine={true}
              tickMargin={5}
              hide={false}
              axisLine={true}
              mirror={false}
              tickCount={10}
              orientation={"left"}
              type={"number"}
              reversed={false}
              scale={"linear"}
              allowDuplicatedCategory={false}
              padding={{ top: 5, bottom: 5 }}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel={false} color={"#DC143C"} 
              hideIndicator={false}
              indicator={"line"} 
              />}
            />
            <Bar dataKey="quant" fill="#4682B4" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}

