"use client"

import {
  ChartConfig,
} from "@/components/ui/chart"
import React, { useEffect, useState } from "react"

import { Check, ChevronsUpDown, Link } from "lucide-react";
import { z } from "zod";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraficoQuantReq } from "./graficoQuantReq";
import { GraficoMSReq } from "./graficoMSReq";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type AmbienteGraficoProps = {
  servicoNome: string | null;
  rotaNome: string | null;
  agrupamento: string;
};

const graficosMap: Record<
  string,
  React.ComponentType<AmbienteGraficoProps>
> = {
  GraficoQuantReq: GraficoQuantReq,
  GraficoMSReq: GraficoMSReq,
};

const FormSchema = z.object({
  grafico: z.string().min(1, "Selecione um gráfico"),
  agrupamento: z.string().min(1, "Selecione um agrupamento para as informações"),
});

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

const listaGrafico = [
  { label: "Requisições", value: "GraficoQuantReq" },
  { label: "Milissegundos", value: "GraficoMSReq" },
]



export function AmbienteGrafico({ servicoNome, rotaNome }: {servicoNome: string | null; rotaNome: string | null;}) {

const [grafico, setGrafico] = useState<{ label: string; value: string, }[]>([]);
const [graficoSelecionado, setGraficoSelecionado] = useState<{ label: string; value: string }>(listaGrafico[0]);
const [agrupamento, setAgrupamento] = useState<{ value: string} >({value: "segundo"});

const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
});

useEffect(() => {
  async function fetchGrafico() {
    try {
      setGrafico(listaGrafico);
    } catch (error) {
      console.error("Erro ao carregar rastros:", error);
      setGrafico([]);
    }
  }
  fetchGrafico();
}, []);

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.grafico) {
      alert("Selecione um rastro antes de buscar.");
      return;
    }
  
    const selectedGrafico = grafico.find((r) => r.value === data.grafico);
    if (selectedGrafico) {
      setGraficoSelecionado(selectedGrafico);
  }

  }

  return (
    <div>
      <div className="p-2">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-end gap-4">
      <FormField
        control={form.control}
        name="grafico"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-[700px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? grafico.find((r) => r.value === field.value)?.label
                      : "Selecione o Grafico"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[700px] p-0">
                <Command>
                  <CommandInput placeholder="Busque o Grafico..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>Nenhum Grafico encontrado.</CommandEmpty>
                    <CommandGroup>
                      {grafico.map((graf) => (
                        <CommandItem
                          value={graf.label}
                          key={graf.value}
                          onSelect={() => {
                            form.setValue("grafico", graf.value);
                            form.handleSubmit(handleSubmit)();
                          }}
                        >
                          {graf.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              graf.value === field.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
          
        )}
      />
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
    <div className="p-2">
    {grafico && graficosMap[graficoSelecionado?.value] && (
          React.createElement(graficosMap[graficoSelecionado?.value], {
            servicoNome: servicoNome,
            rotaNome: rotaNome,
            agrupamento: agrupamento.value
  })
)}
    </div>
  </div>
  )
}

