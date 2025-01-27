import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
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
import { listaClientes } from "@/services/graphService";

const FormSchema = z.object({
  rastro: z.string({
    required_error: "",
  }),
});

interface ComboboxFormProps {
  onSubmit: (rastro: string) => void;
}

export function ComboboxForm({ onSubmit }: ComboboxFormProps) {
  const [rastros, setRastros] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function fetchRastros() {
      try {
        const dados = await listaClientes();
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
    onSubmit(data.rastro);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                        ? rastros.find(
                            (rastro) => rastro.value === field.value
                          )?.label
                        : "Seleciona o rastro"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[700px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Busque o rastro..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
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
                                rastro.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
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
        <Button type="submit">Buscar</Button>
      </form>
    </Form>
  );
}
