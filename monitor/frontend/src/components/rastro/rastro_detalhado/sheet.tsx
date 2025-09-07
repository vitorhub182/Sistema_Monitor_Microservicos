import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ReactJson from "@microlink/react-json-view";

import { useState } from "react";
import { descricaoSpan } from "@/services/RastroService";

export function SheetComponent({ spanId }: { spanId: string | null }) {
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={!spanId}
          type="button"
          variant="secondary"
          onClick={handleDescricao}
        >
          Descrição
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-auto sm:max-w-[50w] overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Dados do Salto</SheetTitle>
          <SheetDescription>
            <ReactJson
              src={descricaoRastro}
              theme="rjv-default"
              iconStyle="square"
              quotesOnKeys={false}
              collapsed={2}
              displayDataTypes={true}
              enableClipboard={false}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
