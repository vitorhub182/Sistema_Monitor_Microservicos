"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/components/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ObjGen, SelecaoGenericaInterface } from "@/dto/objetoGenerico"

export function SelecaoGenerica({lista, onSubmit}: SelecaoGenericaInterface) {
  const listaTodos = React.useMemo(() => {
    if (!lista) return []
    const jaTemTodos = lista.some(item => item.value === "*")
    return jaTemTodos ? lista : [{ value: "*", label: "Todos" }, ...lista]
  }, [lista])

  const [open, setOpen] = React.useState(false)
  const [info, setInfo] = React.useState<ObjGen | null>(listaTodos[0])

  React.useEffect(() => {
    async function fetchData() {
      try {
        if (!info) return
        onSubmit(info)
      } catch (error) {
        console.error("Erro definir valor selecionado:", error)
      }
    }

    fetchData()
  }, [info])
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[1000px] justify-between"
        >
          {listaTodos ? listaTodos.find((item) => item.value === info?.value)?.label : "Todos"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <CommandInput placeholder="Pesquise..." />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado</CommandEmpty>
            <CommandGroup>
              {listaTodos?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setInfo(currentValue === info?.value ? {value: "*", label:"Todos"} : {value: currentValue, label: ""})
                    setOpen(false)
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      info?.value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}