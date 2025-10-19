"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
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
import { AmbienteGraficoProps, EntradaMetricaDTO } from "@/dto/metrica";
import { getMetricaCall1 } from "@/services/MetricaService";
import { DataGrafico } from "../Auxiliar/DataFormat";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import ReactJson from "@microlink/react-json-view";
import { ObjGen } from "@/dto/objetoGenerico";
import { FormSchema } from "../Auxiliar/TiposEspeciais";

export const description = "Chamadas";

const chartConfig = {
  value: {
    label: "value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const padraoEntrada: EntradaMetricaDTO = {
  rota: "",
  servico: "",
  agrupamento: "minuto",
  periodo: 10,
  tipo: "avg",
};

export function GraficoCall(entrada: AmbienteGraficoProps) {
  const [dadosQR, setDadosQR] = React.useState<ObjGen[]>([]);
  const [txAtua, setTxAtua] = React.useState<number>(60);

  const [parametros, setParametros] = React.useState<EntradaMetricaDTO>(() => ({
    ...padraoEntrada,
    servico: entrada.listaServico?.[0] ?? "",
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  React.useEffect(() => {
    async function fetchData() {
      try {
        const resposta = await getMetricaCall1(parametros);
        setDadosQR(resposta);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [
    parametros.agrupamento,
    parametros.periodo,
    parametros.servico,
    parametros.tipo,
  ]);

  
  React.useEffect(() => {
    if (!txAtua || txAtua < 1) return; // segurança
    let ativo = true;

    const id = setInterval(async () => {
      if (!ativo) return;
      try {
        const resposta = await getMetricaCall1(parametros);
        if (ativo) setDadosQR(resposta);
      } catch (err) {
        console.error("Erro ao atualizar dados (auto-refresh):", err);
      }
    }, txAtua * 1000);

    return () => {
      ativo = false;
      clearInterval(id);
    };
  }, [txAtua, parametros]);

  const handleChangePeriodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsed = Number(value);

    if (!isNaN(parsed)) {
      setParametros((prev) =>
        prev ? { ...prev, periodo: parsed } : padraoEntrada
      );
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
                  <Label htmlFor="txAtua">Taxa de Atualização: </Label>
                  <Form {...form}>
                    <form className="flex items-end gap-4">
                      <FormField
                        control={form.control}
                        name="txAtua"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setTxAtua(Number(value));
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="items-start">
                                  <SelectValue placeholder="Taxa de Atualização: " />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="5">5 segundos</SelectItem>
                                <SelectItem value="10">10 segundos</SelectItem>
                                <SelectItem value="30">30 segundos</SelectItem>
                                <SelectItem value="60">1 minuto</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="agrupamento">Agrupamento: </Label>
                  <Form {...form}>
                    <form className="flex items-end gap-4">
                      <FormField
                        control={form.control}
                        name="agrupamento"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setParametros((prev) =>
                                  prev
                                    ? { ...prev, agrupamento: value }
                                    : padraoEntrada
                                );
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Agrupar em" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="segundo">Segundo</SelectItem>
                                <SelectItem value="minuto">Minuto</SelectItem>
                                <SelectItem value="hora">Hora</SelectItem>
                                <SelectItem value="dia">Dia</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="tipo">Tipo: </Label>
                  <Form {...form}>
                    <form className="flex items-end gap-4">
                      <FormField
                        control={form.control}
                        name="tipo"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setParametros((prev) =>
                                  prev
                                    ? { ...prev, tipo: value }
                                    : padraoEntrada
                                );
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="min">Mínimo</SelectItem>
                                <SelectItem value="max">Máximo</SelectItem>
                                <SelectItem value="avg">Média</SelectItem>
                                <SelectItem value="sum">Somatório</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="servico">Serviço: </Label>
                  <Form {...form}>
                    <form className="flex items-end gap-4">
                      <FormField
                        control={form.control}
                        name="servico"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setParametros((prev) =>
                                  prev
                                    ? { ...prev, servico: value }
                                    : padraoEntrada
                                );
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Serviço" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {entrada.listaServico?.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>

                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="periodo">
                    {parametros.agrupamento} atrás:{" "}
                  </Label>
                  <Input
                    id="periodo"
                    defaultValue={parametros.periodo}
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
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="label"
                  tickLine={true}
                  axisLine={true}
                  tickMargin={8}
                  tickFormatter={(estampa) => {
                    return DataGrafico(estampa);
                  }}
                  hide={false}
                  orientation={"bottom"}
                  type={"category"}
                  padding={{ left: 5, right: 5 }}
                />

                <YAxis
                  dataKey={"value"}
                  tickLine={true}
                  tickMargin={5}
                  hide={false}
                  axisLine={true}
                  mirror={false}
                  tickCount={10}
                  orientation={"left"}
                  type={"number"}
                  reversed={false}
                  scale={"auto"}
                  allowDuplicatedCategory={false}
                  padding={{ top: 5, bottom: 5 }}
                />

                <ChartTooltip
                  cursor={true}
                  content={
                    <ChartTooltipContent
                      hideLabel={false}
                      color={"#4682B4"}
                      hideIndicator={false}
                      indicator={"line"}
                    />
                  }
                />

                <Line
                  dataKey="value"
                  type="linear"
                  fill="#4682B4"
                  dot={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <ReactJson
              src={parametros}
              theme="rjv-default"
              iconStyle="triangle"
              quotesOnKeys={false}
              collapsed={0}
              displayDataTypes={true}
              enableClipboard={false}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
