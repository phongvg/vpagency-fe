import AppButton from "@/shared/components/common/AppButton";
import AppPagination from "@/shared/components/common/AppPagination";
import AppSelect from "@/shared/components/common/AppSelect";
import { SkeletonTable } from "@/shared/components/SkeletonTable";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/components/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/shared/constants/pageSize.constant";
import { cn } from "@/shared/libs/utils";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, SearchX, Settings2 } from "lucide-react";
import { useMemo, useState } from "react";

const INDEX_COLUMN_ID = "index";

interface AppTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;

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

  isScrollVertical?: boolean;
}

export function AppTable<TData, TValue>({
  columns,
  data,
  loading = false,
  page = 1,
  pageCount = 0,
  pageSize = DEFAULT_PAGE_SIZE,
  onPageChange,

  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  rowIdKey = "id" as keyof TData,

  enableColumnVisibility = false,
  columnVisibility,
  onColumnVisibilityChange,

  getRowClassName,

  isScrollVertical = false,
}: AppTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

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

  const getStickyStyle = (meta: { sticky?: "left" | "right"; stickyOffset?: number } | undefined) => {
    if (!meta?.sticky) return {};

    const styles: React.CSSProperties = {
      position: "sticky",
      zIndex: 20,
    };

    if (meta.sticky === "left") {
      styles.left = meta.stickyOffset ?? 0;
    } else if (meta.sticky === "right") {
      styles.right = meta.stickyOffset ?? 0;
    }

    return styles;
  };

  const table = useReactTable({
    data,
    columns: resolvedColumns,

    state: {
      sorting,
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

    onSortingChange: setSorting,

    getRowId: (row) => String(row[rowIdKey]),
    enableRowSelection,
    onRowSelectionChange: enableRowSelection ? onRowSelectionChange : undefined,

    onColumnVisibilityChange: enableColumnVisibility ? onColumnVisibilityChange : undefined,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return (
      <div className='w-full max-w-full'>
        <SkeletonTable />
      </div>
    );
  }

  if (table.getRowModel().rows?.length === 0 && !loading) {
    return (
      <div className='flex flex-col justify-center py-4 h-48'>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <SearchX className='text-primary' />
            </EmptyMedia>

            <EmptyTitle className='font-bold uppercase'>Danh sách trống</EmptyTitle>
            <EmptyDescription className='text-white/50'>Không có dữ liệu phù hợp với tiêu chí tìm kiếm</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
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

      <div className={cn("w-full max-w-full", "overflow-x-auto", "scrollbar-custom", isScrollVertical && "max-h-96 overflow-y-auto")}>
        <Table>
          <TableHeader className='top-0 z-30 sticky'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as { sticky?: "left" | "right"; stickyOffset?: number } | undefined;
                  const isSticky = meta?.sticky || header.column.id === "__select";
                  const stickyStyle = header.column.id === "__select" ? { position: "sticky" as const, left: 0 } : getStickyStyle(meta);

                  return (
                    <TableHead
                      key={header.id}
                      style={{ minWidth: header.column.columnDef.minSize, ...stickyStyle }}
                      className={cn(
                        isScrollVertical && "bg-black",
                        isSticky && "z-20 bg-white/5 backdrop-blur-lg shadow-[2px_0_5px_-2px_rgba(0,0,0,0.2)]"
                      )}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            header.column.getCanSort() && header.column.id !== INDEX_COLUMN_ID && "flex items-center gap-2 cursor-pointer select-none"
                          )}
                          onClick={header.column.id !== INDEX_COLUMN_ID ? header.column.getToggleSortingHandler() : undefined}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && header.column.id !== INDEX_COLUMN_ID && (
                            <span className='ml-auto'>
                              {header.column.getIsSorted() === "asc" ? (
                                <ArrowUp className='w-4 h-4' />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ArrowDown className='w-4 h-4' />
                              ) : (
                                <ArrowUpDown className='opacity-50 w-4 h-4' />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length &&
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={getRowClassName?.(row.original)}>
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as { sticky?: "left" | "right"; stickyOffset?: number } | undefined;
                    const isSticky = meta?.sticky || cell.column.id === "__select";
                    const stickyStyle = cell.column.id === "__select" ? { position: "sticky" as const, left: 0 } : getStickyStyle(meta);

                    return (
                      <TableCell
                        key={cell.id}
                        style={{ minWidth: cell.column.columnDef.minSize, ...stickyStyle }}
                        className={cn(isSticky && "z-10 bg-white/5 backdrop-blur-lg shadow-[2px_0_5px_-2px_rgba(0,0,0,0.2)]")}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {onPageChange && (
        <div className='flex items-center'>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span>Hiển thị</span>
              <div className='max-w-[120px]'>
                <AppSelect
                  value={String(pageSize)}
                  onValueChange={(value) => onPageChange(1, Number(value))}
                  options={PAGE_SIZE_OPTIONS.map((size) => ({ label: String(size), value: String(size) }))}
                />
              </div>
              <span>bản ghi</span>
            </div>
          </div>

          <div className='flex-1'>
            <AppPagination page={page} totalPages={pageCount} onPageChange={(page) => onPageChange(page, pageSize)} />
          </div>
        </div>
      )}
    </div>
  );
}
