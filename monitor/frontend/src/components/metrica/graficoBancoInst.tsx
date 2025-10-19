"use client";

import { z } from "zod";
import React from "react";
import {
  AmbienteGraficoProps,
  EntradaMetricaDTO,
  MetricaBancoMaxDTO,
  MetricaBancoSaidaDTO,
  MetricaBancoUsageDTO,
} from "@/dto/metrica";
import {
  getMetricaBancoConnectionMax,
  getMetricaBancoConnectionUsage,
} from "@/services/MetricaService";
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
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import ReactJson from "@microlink/react-json-view";
import { FormSchema } from "../Auxiliar/TiposEspeciais";
import * as echarts from "echarts";

const PANEL_URL = "https://echarts.apache.org/examples/data/asset/img/custom-gauge-panel.png";

const MAX_RAD = 200; // 100% = 200 radianos (do exemplo original)
const OUTER_R = 200;
const INNER_R = 170;
const POINTER_INNER_R = 40;
const INSIDE_PANEL_R = 140;
const DUR = 1000;

export const description = "Uso conexões por pool no Banco de Dados";

const padraoEntrada: EntradaMetricaDTO = {
  servico: "",
};

const padraoSaida: MetricaBancoSaidaDTO = {
  usage: 0,
  pool: "",
  max: 0,
  pending_requests: 0,
  state: "",
};

export function GraficoBancoInst(entrada: AmbienteGraficoProps) {
  const [dadosQR, setDadosQR] = React.useState<MetricaBancoSaidaDTO>(
    padraoSaida
  );

  const [txAtua, setTxAtua] = React.useState<number>(60);

  const [parametros, setParametros] = React.useState<EntradaMetricaDTO>(() => ({
    ...padraoEntrada,
    servico: entrada.listaServico?.[0] ?? "",
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const divRef = React.useRef<HTMLDivElement | null>(null);
  const chartRef = React.useRef<echarts.EChartsType | null>(null);

  // cria/descarta o gráfico
  React.useEffect(() => {
    if (!divRef.current) return;
    chartRef.current = echarts.init(divRef.current, undefined, {
      renderer: "canvas",
    });
    const obs = new ResizeObserver(() => chartRef.current?.resize());
    obs.observe(divRef.current);
    return () => {
      obs.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  // option base do gauge (sem dados)
  const setBaseOption = React.useCallback(() => {
    if (!chartRef.current) return;

    const renderItem = (params: any, api: any) => {
      const valOnRadian = api.value(1);
      const coords = api.coord([api.value(0), valOnRadian]);
      const polarEndRadian = coords[3];

      const imageStyle = {
        image: PANEL_URL,
        x: params.coordSys.cx - OUTER_R,
        y: params.coordSys.cy - OUTER_R,
        width: OUTER_R * 2,
        height: OUTER_R * 2,
      };

      const convertToPolarPoint = (
        p: any,
        radius: number,
        rad: number
      ): [number, number] => [
        Math.cos(rad) * radius + p.coordSys.cx,
        -Math.sin(rad) * radius + p.coordSys.cy,
      ];

      const makePointerPoints = (p: any, endRad: number) => [
        convertToPolarPoint(p, OUTER_R, endRad),
        convertToPolarPoint(p, OUTER_R, endRad + Math.PI * 0.03),
        convertToPolarPoint(p, POINTER_INNER_R, endRad),
      ];

      const makeText = (val: number) =>
        `${((val / MAX_RAD) * 100).toFixed(0)}%`;

      return {
        type: "group",
        children: [
          {
            type: "image",
            style: imageStyle,
            clipPath: {
              type: "sector",
              shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r: OUTER_R,
                r0: INNER_R,
                startAngle: 0,
                endAngle: -polarEndRadian,
                transition: "endAngle",
                enterFrom: { endAngle: 0 },
              },
            },
          },
          {
            type: "image",
            style: imageStyle,
            clipPath: {
              type: "polygon",
              shape: { points: makePointerPoints(params, polarEndRadian) },
              extra: {
                polarEndRadian,
                transition: "polarEndRadian",
                enterFrom: { polarEndRadian: 0 },
              },
              during: (apiDuring: any) => {
                apiDuring.setShape(
                  "points",
                  makePointerPoints(
                    params,
                    apiDuring.getExtra("polarEndRadian")
                  )
                );
              },
            },
          },
          {
            type: "circle",
            shape: {
              cx: params.coordSys.cx,
              cy: params.coordSys.cy,
              r: INSIDE_PANEL_R,
            },
            style: {
              fill: "#fff",
              shadowBlur: 25,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "rgba(76,107,167,0.4)",
            },
          },
          {
            type: "text",
            extra: {
              valOnRadian: valOnRadian,
              transition: "valOnRadian",
              enterFrom: { valOnRadian: 0 },
            },
            style: {
              text: makeText(valOnRadian),
              fontSize: 48,
              fontWeight: 700,
              x: params.coordSys.cx,
              y: params.coordSys.cy,
              fill: "rgb(0,50,190)",
              align: "center",
              verticalAlign: "middle",
              enterFrom: { opacity: 0 },
            },
            during: (apiDuring: any) => {
              const t =
                ((apiDuring.getExtra("valOnRadian") / MAX_RAD) * 100).toFixed(
                  0
                ) + "%";
              apiDuring.setStyle("text", t);
            },
          },
        ],
      };
    };

    chartRef.current.setOption(
      {
        animationEasing: "quarticInOut",
        animationDuration: DUR,
        animationDurationUpdate: DUR,
        animationEasingUpdate: "quarticInOut",
        dataset: { source: [[1, 0]] }, // começa em 0
        tooltip: {
          formatter: () => {
            return [
              `<b>Pool:</b> ${dadosQR.pool || "-"}`,
              `<b>Uso:</b> ${dadosQR.usage ?? 0}`,
              `<b>Máximo:</b> ${dadosQR.max ?? 0}`,
              `<b>Pendentes:</b> ${dadosQR.pending_requests ?? 0}`,
              `<b>Estado:</b> ${dadosQR.state || "-"}`,
            ].join("<br/>");
          },
        },
        angleAxis: { type: "value", startAngle: 0, show: false, min: 0, max: MAX_RAD },
        radiusAxis: { type: "value", show: false },
        polar: {},
        series: [{ type: "custom", coordinateSystem: "polar", renderItem }],
      } as echarts.EChartsCoreOption,
      { notMerge: true }
    );
  }, [dadosQR.pool, dadosQR.max, dadosQR.pending_requests, dadosQR.state]);

  // inicializa base do gráfico
  React.useEffect(() => {
    setBaseOption();
  }, [setBaseOption]);

  // === BUSCAS ===
  React.useEffect(() => {
    async function fetchData() {
      try {
        const respostaMax: MetricaBancoMaxDTO =
          await getMetricaBancoConnectionMax(parametros); 
        const respostaUsage: MetricaBancoUsageDTO =
          await getMetricaBancoConnectionUsage(parametros);

        if (respostaMax) {
          setDadosQR((prev) => ({
            ...prev,
            max: respostaMax.max ?? 0,
            pending_requests: respostaMax.pending_requests ?? 0,
          }));
        }
        if (respostaUsage) {
          setDadosQR((prev) => ({
            ...prev,
            usage: respostaUsage.usage ?? 0,
            pool: respostaUsage.pool ?? "",
            state: respostaUsage.state ?? "",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, [parametros.servico]);

  React.useEffect(() => {
    if (!txAtua || txAtua < 1) return;
    let ativo = true;

    const id = setInterval(async () => {
      if (!ativo) return;
      try {
        const respostaUsage: MetricaBancoUsageDTO =
          await getMetricaBancoConnectionUsage(parametros);

        if (respostaUsage && ativo) {
          setDadosQR((prev) => ({
            ...prev,
            usage: respostaUsage.usage ?? 0,
            pool: respostaUsage.pool ?? prev.pool,
            state: respostaUsage.state ?? prev.state,
          }));
        }
      } catch (err) {
        console.error("Erro ao atualizar dados (auto-refresh):", err);
      }
    }, txAtua * 1000);

    return () => {
      ativo = false;
      clearInterval(id);
    };
  }, [txAtua, parametros]);

  React.useEffect(() => {
    if (!chartRef.current) return;

    const { usage, max } = dadosQR;
    const maxSeguro = Number(max) > 0 ? Number(max) : 1; 
    const perc = Math.max(0, Math.min(1, Number(usage) / maxSeguro)); 
    const valOnRadian = perc * MAX_RAD;

    chartRef.current.setOption(
      { dataset: { source: [[1, valOnRadian]] } } as echarts.EChartsCoreOption,
      { notMerge: false, lazyUpdate: true }
    );
  }, [dadosQR.usage, dadosQR.max]);

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
                                  prev ? { ...prev, servico: value } : padraoEntrada
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
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="px-2">
        <div
          ref={divRef}
          className="h-full rounded-xl border"
          style={{ height: 360 }}
        />
<div className="mt-2">
          <ReactJson src={parametros} name="dados" collapsed={0} enableClipboard={false} />
        </div> 
      </div>
    </div>
  );
}
