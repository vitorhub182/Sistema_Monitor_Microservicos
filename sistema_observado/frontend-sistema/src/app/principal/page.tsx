"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { deleteGenerico, getGenerico, postGenerico } from "@/services/ServiceGenerico"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const FormSchema = z.object({
  body: z.string(),
})
export default function Main() {
  const [resposta, setResposta] = useState<string | null>(null);
  const [service, setService] = useState<string>("aluno");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log();
  }

  const handleBuscar = async () => {
    const body = form.getValues("body");
    try {
      const resposta = await getGenerico(service, body);
      setResposta(resposta);
      console.log(resposta);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao buscar.");
    }
  };

  const handlePublicar = async () => {
    const body = form.getValues("body");
    try {
      const resposta = await postGenerico(service, body);
      setResposta(resposta);
      console.log(resposta);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao buscar.");
    }
  };

  const handleDeletar = async () => {
    try {
      const body = form.getValues("body");
      const status = await deleteGenerico(service, body);
      if (!status) {
        alert("Falha na deleção!");
      } else {
        alert("Deleção realizada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar:");
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-300 justify-start min-h-screen p-8">
      <Form {...form}>
        <div className="flex gap-x-4 mb-6">
          <Button type="button" variant="outline" className="text-green-600" onClick={handleBuscar}>
            Buscar
          </Button>
          <Button type="button" variant="outline" className="text-yellow-600" onClick={handlePublicar}>
            Publicar
          </Button>
          <Button type="button" variant="outline" className="text-red-600" onClick={handleDeletar}>
            Apagar
          </Button>
          <Button type="button" variant="outline" className="text-blue-600" >
            Sobreescrever
          </Button>
          <Button type="button" variant="outline" className="text-purple-600" >
            Atualizar
          </Button>
        </div>

        <div className="flex gap-x-4 mb-6">
          <Select onValueChange={(value) => setService(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione o microserviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Microsserviços</SelectLabel>
                <SelectItem value="aluno">Aluno</SelectItem>
                <SelectItem value="curso">Curso</SelectItem>
                <SelectItem value="relatorio">Relatório</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Corpo da requisição</FormLabel>
                <FormControl>
                  <Textarea placeholder="Entre com os dados de requisição..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* 🔹 Área de output */}
      <div className="w-2/3 mt-6 p-4 rounded bg-black text-white font-mono overflow-auto min-h-[150px]">
        {resposta ? JSON.stringify(resposta) : "Aguardando resposta..."}
      </div>
    </div>
  );
}
