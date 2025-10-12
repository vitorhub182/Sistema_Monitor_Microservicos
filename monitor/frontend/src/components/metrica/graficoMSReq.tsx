"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react"

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
import { z } from "zod";
import React from "react";
import { EntradaMetricaDTO } from "@/dto/metrica";
import { getListaMSMetrica } from "@/services/MetricaService";
import { DataGrafico } from "../Auxiliar/DataFormat";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const description = "Requisições x Milissegundo";

export const schema = z.object({
  estampaTempo: z.string(),
  milissegundos: z.number(),
});

const chartConfig = {
  milissegundos: {
    label: "milissegundos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function GraficoMSReq({
  servicoNome,
  rotaNome,
}: {
  servicoNome?: string | null;
  rotaNome?: string | null;
}) {
  const [dadosQR, setDadosQR] = React.useState<z.infer<typeof schema>[]>([]);
  const [periodo, setPeriodo] = React.useState<{ value: number }>({ value: 7 });

  React.useEffect(() => {
    async function fetchData() {
      try {
        if (!servicoNome || !rotaNome) return;
        const span: EntradaMetricaDTO = {
          servico: servicoNome,
          rota: rotaNome,
          periodo: periodo.value,
        };
        const resposta = await getListaMSMetrica(span);

        setDadosQR(resposta);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [servicoNome, rotaNome, periodo]);

  const handleChangePeriodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsed = Number(value);

    if (!isNaN(parsed)) {
      setPeriodo({ value: parsed });
    }
  };
  return (
    <div>
       <div className="flex gap-4 p-1">
       <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Filtros Personalizados</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Filtros</h4>
                <p className="text-muted-foreground text-sm">
                  Ajuste a apresentação deste gráfico
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="periodo">Dias atrás: </Label>
                  <Input
                    id="periodo"
                    defaultValue={periodo.value}
                    type="number"
                    onChange={handleChangePeriodo}
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
        <LineChart
            accessibilityLayer
            data={dadosQR}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
             dataKey="estampaTempo"
             tickLine={true}
             tickMargin={5}
             hide={false}
             axisLine={true}
             orientation={"bottom"}
             type={"category"}
             padding={{ left: 5, right: 5 }}
             tickFormatter={(value) => {
               return DataGrafico(value);
             }}
            />
            <YAxis
              dataKey={"milissegundos"}
              tickLine={true}
              tickMargin={5}
              hide={false}
              axisLine={true}
              mirror={false}
              tickCount={10}
              orientation={"left"}
              type={"number"}
              reversed={false}
              scale={"sqrt"}
              allowDuplicatedCategory={false}
              padding={{ top: 5, bottom: 5 }}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  color={"#DC143C"}
                  hideIndicator={false}
                  indicator={"line"}
                />
              }
            />
            <Line
              dataKey="milissegundos"
              type="basisOpen"
              stroke="#4682B4"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>

          {/* <BarChart accessibilityLayer data={dadosQR}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="estampaTempo"
              tickLine={true}
              tickMargin={5}
              hide={false}
              axisLine={true}
              orientation={"bottom"}
              type={"category"}
              padding={{ left: 5, right: 5 }}
              tickFormatter={(value) => {
                return DataGrafico(value);
              }}
            />
            <YAxis
              dataKey={"milissegundos"}
              tickLine={true}
              tickMargin={5}
              hide={false}
              axisLine={true}
              mirror={false}
              tickCount={10}
              orientation={"left"}
              type={"number"}
              reversed={false}
              scale={"sqrt"}
              allowDuplicatedCategory={false}
              padding={{ top: 5, bottom: 5 }}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  color={"#DC143C"}
                  hideIndicator={false}
                  indicator={"line"}
                />
              }
            />
            <Bar
              dataKey="milissegundos"
              fill="#4682B4"
              radius={0}
              animationDuration={1000}
            />
          </BarChart>
        */}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
    </div>
    </div>
  );
}
