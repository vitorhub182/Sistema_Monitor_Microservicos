"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  LoaderIcon,
} from "lucide-react"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { getListaLogs } from "@/services/logService"
import { EntradaLogDTO } from "@/dto/log"

export const schema = z.object({
  tempo: z.string(),
  noh: z.string(),
  servico: z.string(),
  tipo: z.string(),
  mensagem: z.string(),
})

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "estampa de tempo",
    header: "Estampa de Tempo",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
          {row.original.tempo}
      </div>
    ),
  },
  {
    accessorKey: "id do serviço",
    header: "ID do Serviço",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
          {row.original.noh}
      </div>
    ),
  },
  {
    accessorKey: "nome do serviço",
    header: "Nome do Serviço",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
          {row.original.servico}
      </div>
    ),
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 h-10  justify-center whitespace-nowrap"
      >
        {row.original.tipo === "INFO" ? (
          <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
        ) : (
          <LoaderIcon />
        )}
        {row.original.tipo}  
      </Badge>
    ),
  },
  {
    accessorKey: "mensagem",
    header: "Mensagem",
    cell: ({ row }) => (
        <div className="whitespace-nowrap">
          {row.original.mensagem}
      </div>
    )
  }
]

export function LogTable({ tempoI, tempoF }: { tempoI: string | undefined, tempoF: string | undefined }) {
  const [data, setData] = React.useState<z.infer<typeof schema>[]>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  React.useEffect(() => {
    async function fetchData() {
      try {
        if (!tempoI || !tempoF) return
        const intervalo: EntradaLogDTO= {tempoInicial: tempoI, tempoFinal: tempoF};
        const resposta = await getListaLogs(intervalo)
        setData(resposta)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }
    fetchData()
  }, [tempoI, tempoF])

  return (
    <Tabs defaultValue="outline" className="flex w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ColumnsIcon />
                <span className="hidden lg:inline">Personalize a Visualização</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 whitespace-nowrap "
      >
        <div className="overflow-hidden rounded-lg border">
          
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                  ))}
                  </TableRow>
                  ))}
                  </TableBody>
                  </Table>
                  </div>
                  <div className="flex items-center justify-between px-4">
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                      <div className="hidden items-center gap-2 lg:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                          Logs por página
                        </Label>
                        <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => {
                          table.setPageSize(Number(value))
                        }
                      }
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Ir para a primeira página</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Ir para a página anterior</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Ir para a próxima página</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Ir para a última página </span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
  value="past-performance"
  className="flex flex-col px-4 lg:px-6"
>
  <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"/>
</TabsContent>
    </Tabs>
  )
}