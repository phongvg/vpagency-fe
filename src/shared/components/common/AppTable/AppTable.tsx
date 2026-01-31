import AppPagination from "@/shared/components/common/AppPagination/AppPagination";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface AppTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page?: number;
  pageCount?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

export function AppTable<TData, TValue>({ columns, data, page = 1, pageCount = 0, pageSize = 10, onPageChange }: AppTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex: page, pageSize }) : updater;

      onPageChange?.(next.pageIndex, next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='space-y-4 py-4'>
      <ScrollArea className='w-full max-w-full'>
        <Table>
          <TableHeader className='top-0 z-10 sticky backdrop-blur-sm'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ minWidth: header.column.columnDef.minSize }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ minWidth: cell.column.columnDef.minSize }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      {onPageChange && <AppPagination page={page} totalPages={pageCount} onPageChange={(page) => onPageChange(page, pageSize)} />}
    </div>
  );
}
