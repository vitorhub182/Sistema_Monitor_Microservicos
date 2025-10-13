import { z } from "zod";

export type ChartRow = {
    date: string;
    global: number;
    [key: string]: number | string;
  };


  export const FormSchema = z.object({
    agrupamento: z
      .string()
      .min(1, "Selecione um agrupamento para as informações"),
    tipo: z.string().min(1, "Selecione um tipo de contagem"),
    servico: z.string().min(1, "Selecione um Serviço"),
    txAtua: z.string().min(1, "Selecione a taxa de atualização"),
  });