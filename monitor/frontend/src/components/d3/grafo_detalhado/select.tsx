import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { deleteTrace, listaRastros, listaNos, buscarCaminho } from "@/services/graphService";
import { DijkstraDTO } from "@/dto/graph";

const FormSchema = z.object({
  rastro: z.string().min(1, "Selecione um rastro"),
  firstNode: z.string().optional(),
  lastNode: z.string().optional(),
});

interface ComboboxFormProps {
  onSubmit: (rastro: string) => void;
}

export function ComboboxForm({ onSubmit }: ComboboxFormProps) {
  const [rastros, setRastros] = useState<{ label: string; value: string }[]>([]);
  
  useEffect(() => {
    async function fetchRastros() {
      try {
        const dados = await listaRastros();
        setRastros(dados);
      } catch (error) {
        console.error("Erro ao carregar rastros:", error);
        setRastros([]);
      }
    }
    fetchRastros();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.rastro) {
      alert("Selecione um rastro antes de buscar.");
      return;
    }
    onSubmit(data.rastro);
  }

  const handleDelete = async () => {
    try {
      const rastroValue = form.getValues("rastro");
      const status = await deleteTrace(rastroValue);
      if (!status) {
        alert("Falha na deleção!");
      } else {
        alert("Rastro deletado com sucesso!");
        const updatedRastros = await listaRastros();
        setRastros(updatedRastros);
      }
    } catch (error) {
      console.error("Erro ao deletar rastro:", error);
      alert("Erro ao deletar o rastro.");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Combobox de Rastro */}
        <FormField
          control={form.control}
          name="rastro"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Selecione o Rastro</FormLabel>
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
                        ? rastros.find((r) => r.value === field.value)?.label
                        : "Selecione o rastro"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[700px] p-0">
                  <Command>
                    <CommandInput placeholder="Busque o rastro..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>Nenhum rastro encontrado.</CommandEmpty>
                      <CommandGroup>
                        {rastros.map((rastro) => (
                          <CommandItem
                            value={rastro.label}
                            key={rastro.value}
                            onSelect={() => {
                              form.setValue("rastro", rastro.value);
                            }}
                          >
                            {rastro.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                rastro.value === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-4">
          <Button type="submit">Buscar</Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>Deletar</Button>
        </div>

      </form>
    </Form>
  );
}
