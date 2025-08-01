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
import { DataGrafico } from "../Auxiliar/DataFormat"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export const description = "Requisições x Tempo"
const FormSchema = z.object({
  agrupamento: z.string().min(1, "Selecione um agrupamento para as informações"),
});



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

export function GraficoQuantReq({ servicoNome, rotaNome }: { servicoNome: string | null, rotaNome: string | null, }) {
  const [dadosQR, setDadosQR] = React.useState<z.infer<typeof schema>[]>([])
  const [agrupamento, setAgrupamento] = React.useState<{ value: string} >({value: "segundo"});


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        if (!servicoNome || !rotaNome) return
        const param: EntradaMetricaDTO= {servico: servicoNome, rota: rotaNome, agrupamento: agrupamento.value};
        const resposta = await getListaQuantMetrica(param)
        setDadosQR(resposta)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }

    fetchData()
  }, [servicoNome, rotaNome, agrupamento])


  return (
    <div>
      <div className="p-1">
      <Form {...form}>
        <FormLabel className="flex items-end gap-4"> Filtros personalizados: </FormLabel>
      <form className="flex items-end gap-4">
      <FormField
          control={form.control}
          name="agrupamento"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setAgrupamento({ value });
                }}
                value={field.value}
              >                
             <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Agrupar em" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectItem value="segundo">Segundo</SelectItem>
                <SelectItem value="minuto">Minuto</SelectItem>
                <SelectItem value="hora">Hora</SelectItem>
                <SelectItem value="dia">Dia</SelectItem>
                <SelectItem value="mes">Mes</SelectItem>
                <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
              </Select>
            </FormItem>
          )}
        />
    </form>
  </Form>
      </div>
      <div>
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
            <Bar dataKey="quant" fill="#4682B4" radius={5} animationDuration={1000} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
    </div>
  </div>
  )
}

