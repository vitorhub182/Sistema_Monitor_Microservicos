import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getDescricaoLog } from "@/services/logService";

import { useState } from "react";

export function SheetComponent( {LogId}:{LogId: string | null }) {
  const [descricaoLog, setDescricaoLog] = useState<any>();

  const handleDescricao = async () => {
    try {
      const descricaoRastro: JSON = await getDescricaoLog(LogId);
      if (!descricaoRastro) {
        alert("Dado não encontrado!");
      }
      setDescricaoLog(descricaoRastro);
    } catch (error) {
      alert("Erro: " + error);
    }
  };
  
  return (
          <Sheet>
            <SheetTrigger asChild><Button type="button" variant="secondary" onClick={handleDescricao}>Descricao</Button></SheetTrigger>
            <SheetContent side="right" className="w-auto sm:max-w-[50vw] overflow-auto">
              <SheetHeader>
                <SheetTitle>Dados do Salto</SheetTitle>
                <SheetDescription>
                  <pre>{JSON.stringify(descricaoLog, null, 2)}</pre>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
  );
}
