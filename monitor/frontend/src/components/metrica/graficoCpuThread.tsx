"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
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
import {
  getMetricaCpuThread,
} from "@/services/MetricaService";
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
import { FormSchema } from "../Auxiliar/TiposEspeciais";
import { Checkbox } from "../ui/checkbox";

export const description = "Contador de Threads por estado";

const PALETA = [
  "#bfcde0",
  "#bfffff",
  "#dfffbf",
  "#ffbfbf",
  "#B8860B",
  "#FF681F",
  "#459c38",
  "#9c3845",
  "#38459c",
  "#9c8f38",
];

const toVarName = (s: string) =>
s
  .toLowerCase()
  .replace(/['"]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const padraoEntrada: EntradaMetricaDTO = {
  rota: "",
  servico: "",
  agrupamento: "hora",
  periodo: 5,
  tipo: "max",
};

export function GraficoCpuThread(entrada: AmbienteGraficoProps) {
  const [dadosQR, setDadosQR] = React.useState<
    Record<string, number | string>[]
  >([]);
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
        const resposta = await getMetricaCpuThread(parametros);

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

  const metricKeys = React.useMemo(() => {
    if (!dadosQR?.length) return [];
    return Object.keys(dadosQR[0]).filter((k) => k !== "label");
  }, [dadosQR]);

  const series = React.useMemo(() => {
    return metricKeys.map((k, i) => ({
      key: k,
      varName: toVarName(k),
      color: PALETA[i % PALETA.length],
    }));
  }, [metricKeys]);

  const dynamicChartConfig = React.useMemo(() => {
    const entries = series.map((s) => [
      s.varName,
      { label: s.key, color: s.color },
    ]);
    return Object.fromEntries(entries) as ChartConfig;
  }, [series]);

  const dataRecharts = React.useMemo(() => {
    return dadosQR as any[];
  }, [dadosQR]);

  React.useEffect(() => {
    if (!txAtua || txAtua < 1) return;
    let ativo = true;

    const id = setInterval(async () => {
      if (!ativo) return;
      try {
        const resposta = await getMetricaCpuThread(parametros);
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
                                  <SelectValue placeholder="Taxa de Atualização" />
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
            <ChartContainer config={dynamicChartConfig}>
              <BarChart accessibilityLayer data={dataRecharts}>
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) =>
                    new Date(value).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                />
                <CartesianGrid vertical={false} />

                {series.map((s) => (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    fill={`var(--color-${s.varName})`}
                    radius={[0, 0, 0, 0]}
                  />
                ))}

                <ChartTooltip
                  content={<ChartTooltipContent indicator="line" />}
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
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
              enableClipboard={true}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
