import { AppButton } from "@/shared/components/common/AppButton";
import AppPagination from "@/shared/components/common/AppPagination/AppPagination";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type OnChangeFn,
  type RowSelectionState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { useMemo } from "react";

interface AppTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  page?: number;
  pageCount?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;

  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  rowIdKey?: keyof TData;

  enableColumnVisibility?: boolean;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;

  getRowClassName?: (row: TData) => string;
}

export function AppTable<TData, TValue>({
  columns,
  data,
  page = 1,
  pageCount = 0,
  pageSize = 10,
  onPageChange,

  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  rowIdKey = "id" as keyof TData,

  enableColumnVisibility = false,
  columnVisibility,
  onColumnVisibilityChange,

  getRowClassName,
}: AppTableProps<TData, TValue>) {
  const selectColumn = useMemo<ColumnDef<TData> | null>(() => {
    if (!enableRowSelection) return null;

    return {
      id: "__select",
      header: ({ table }) => (
        <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
      enableSorting: false,
      enableHiding: false,
    };
  }, [enableRowSelection]);

  const resolvedColumns = useMemo(() => {
    return selectColumn ? [selectColumn, ...columns] : columns;
  }, [selectColumn, columns]);

  const table = useReactTable({
    data,
    columns: resolvedColumns,

    state: {
      pagination: {
        pageIndex: page,
        pageSize,
      },
      ...(enableRowSelection && rowSelection ? { rowSelection } : {}),
      ...(enableColumnVisibility && columnVisibility ? { columnVisibility } : {}),
    },

    pageCount,
    manualPagination: true,
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex: page, pageSize }) : updater;
      onPageChange?.(next.pageIndex, next.pageSize);
    },

    getRowId: (row) => String(row[rowIdKey]),
    enableRowSelection,
    onRowSelectionChange: enableRowSelection ? onRowSelectionChange : undefined,

    onColumnVisibilityChange: enableColumnVisibility ? onColumnVisibilityChange : undefined,

    getCoreRowModel: getCoreRowModel(),
  });

  if (table.getRowModel().rows?.length === 0) {
    return (
      <div className='flex flex-col justify-center py-4 h-48'>
        <div className='p-6 w-full text-white/50 text-center'>Không có dữ liệu.</div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {enableColumnVisibility && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <AppButton type='button' variant='outline' size='sm'>
              <Settings2 />
              Cấu hình cột
            </AppButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {table
              .getAllLeafColumns()
              .filter((col) => col.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} onCheckedChange={() => column.toggleVisibility()}>
                  {column.columnDef.header as string}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={getRowClassName?.(row.original)}>
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
