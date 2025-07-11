import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const FormSchema = z.object({
  rastro: z.string().min(1, "Selecione um rastro"),
  firstNode: z.string().optional(),
  lastNode: z.string().optional(),
});

import { useState } from "react";
import { descricaoSpan } from "@/services/RastroService";

export function SheetComponent( {spanId}:{spanId: string | null }) {
  const [descricaoRastro, setDescricaoRastro] = useState<any>();

  const handleDescricao = async () => {
    try {
      const descricaoRastro: JSON = await descricaoSpan(spanId);
      if (!descricaoRastro) {
        alert("Rastro não encontrado!");
      }
      setDescricaoRastro(descricaoRastro);
    } catch (error) {
      alert("Erro ao buscar rastro.");
    }
  };
//"w-auto min-w-[300px] max-w-[50vw]"
//"w-auto max-w-[50vw] overflow-auto"
//"w-auto max-w-[50vw] sm:max-w-[50vw]"
  return (
          <Sheet>
            <SheetTrigger asChild><Button type="button" variant="secondary" onClick={handleDescricao}>Descricao</Button></SheetTrigger>
            <SheetContent side="right" className="w-auto sm:max-w-[50vw] overflow-auto">
              <SheetHeader>
                <SheetTitle>Dados do Salto</SheetTitle>
                <SheetDescription>
                  <pre>{JSON.stringify(descricaoRastro, null, 2)}</pre>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
  );
}
