import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getDescricaoLog } from "@/services/logService";
import ReactJson from "@microlink/react-json-view";

import { useState } from "react";

export function SheetComponent({ LogId }: { LogId: string | null }) {
  const [descricaoLog, setDescricaoLog] = useState<any>();

  const handleDescricao = async () => {
    try {
      const descricaoLog: JSON = await getDescricaoLog(LogId);
      if (!descricaoLog) {
        alert("Dado não encontrado!");
      }
      setDescricaoLog(descricaoLog);
    } catch (error) {
      alert("Erro: " + error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="secondary" onClick={handleDescricao}>
          Descricao
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-auto sm:max-w-[50vw] overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Dados do Salto</SheetTitle>
          <SheetDescription>
            <ReactJson
              src={descricaoLog}
              theme="rjv-default"
              iconStyle="square"
              quotesOnKeys={false}
              collapsed={2}
              displayDataTypes={true}
              enableClipboard={false}
            />{" "}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
