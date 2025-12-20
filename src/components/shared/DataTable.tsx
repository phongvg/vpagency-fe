import type { CheckboxProps } from '@/components/ui/Checkbox'
import Checkbox from '@/components/ui/Checkbox'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import type { SkeletonProps } from '@/components/ui/Skeleton'
import Table from '@/components/ui/Table'
import {
  CellContext,
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table'
import classNames from 'classnames'
import type { ChangeEvent, ForwardedRef, ReactNode } from 'react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import TableRowSkeleton from './loaders/TableRowSkeleton'
import Loading from './Loading'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    sticky?: boolean
  }
}

export type OnSortParam = { order: 'asc' | 'desc' | ''; key: string | number }

type DataTableProps<T> = {
  columns: ColumnDef<T>[]
  data?: T[]
  loading?: boolean
  onCheckBoxChange?: (checked: boolean, row: T) => void
  onIndeterminateCheckBoxChange?: (checked: boolean, rows: Row<T>[]) => void
  onPaginationChange?: (page: number) => void
  onSelectChange?: (num: number) => void
  onSort?: (sort: OnSortParam) => void
  pageSizes?: number[]
  selectable?: boolean
  skeletonAvatarColumns?: number[]
  skeletonAvatarProps?: SkeletonProps
  pagingData?: {
    total: number
    pageIndex: number
    pageSize: number
  }
  emptyContent?: ReactNode
  emptyTitle?: string
  emptyDescription?: string
  maxHeight?: string | number
  getRowId?: (originalRow: T, index: number) => string
  getRowClassName?: (row: T) => string
  enableRowSelection?: (row: T) => boolean
}

type CheckBoxChangeEvent = ChangeEvent<HTMLInputElement>

interface IndeterminateCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
  onChange: (event: CheckBoxChangeEvent) => void
  indeterminate: boolean
  onCheckBoxChange?: (event: CheckBoxChangeEvent) => void
  onIndeterminateCheckBoxChange?: (event: CheckBoxChangeEvent) => void
}

const { Tr, Th, Td, THead, TBody } = Table

const EmptyState = ({
  title = 'Không có dữ liệu',
  description = 'Không tìm thấy dữ liệu nào để hiển thị',
  children,
  colSpan,
}: {
  title?: string
  description?: string
  children?: ReactNode
  colSpan: number
}) => {
  if (children) {
    return (
      <TBody>
        <Tr>
          <Td colSpan={colSpan} className="py-12 text-center">
            {children}
          </Td>
        </Tr>
      </TBody>
    )
  }

  return (
    <TBody>
      <Tr>
        <Td colSpan={colSpan} className="py-12 text-center">
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="flex justify-center items-center">
              <img src="/img/empty.svg" alt="" />
            </div>
            <div className="text-center">
              <h3 className="mb-1 font-medium text-gray-600">{title}</h3>
              <p className="text-gray-500 text-sm">{description}</p>
            </div>
          </div>
        </Td>
      </Tr>
    </TBody>
  )
}

const IndeterminateCheckbox = (props: IndeterminateCheckboxProps) => {
  const { indeterminate, onChange, onCheckBoxChange, onIndeterminateCheckBoxChange, ...rest } = props

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate])

  const handleChange = (e: CheckBoxChangeEvent) => {
    onChange(e)
    onCheckBoxChange?.(e)
    onIndeterminateCheckBoxChange?.(e)
  }

  return <Checkbox ref={ref} className="mb-0" onChange={(_, e) => handleChange(e)} {...rest} />
}

export type DataTableResetHandle = {
  resetSorting: () => void
  resetSelected: () => void
}

function _DataTable<T>(props: DataTableProps<T>, ref: ForwardedRef<DataTableResetHandle>) {
  const {
    skeletonAvatarColumns,
    columns: columnsProp = [],
    data = [],
    loading = false,
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
    onPaginationChange,
    onSelectChange,
    onSort,
    pageSizes = [10, 25, 50, 100],
    selectable = false,
    skeletonAvatarProps,
    pagingData,
    emptyContent,
    emptyTitle,
    emptyDescription,
    maxHeight,
    getRowId,
    getRowClassName,
    enableRowSelection,
  } = props

  const pageSize = pagingData?.pageSize ?? data.length
  const pageIndex = pagingData?.pageIndex ?? 1
  const total = pagingData?.total ?? data.length

  const [sorting, setSorting] = useState<ColumnSort[] | null>(null)
  const [rowSelection, setRowSelection] = useState({})

  const pageSizeOption = useMemo(
    () =>
      pageSizes.map((number) => ({
        value: number,
        label: number,
      })),
    [pageSizes],
  )

  const handleCheckBoxChange = useCallback(
    (checked: boolean, row: T) => {
      if (!loading) {
        onCheckBoxChange?.(checked, row)
      }
    },
    [loading, onCheckBoxChange],
  )

  const handleIndeterminateCheckBoxChange = useCallback(
    (checked: boolean, rows: Row<T>[]) => {
      if (!loading) {
        onIndeterminateCheckBoxChange?.(checked, rows)
      }
    },
    [loading, onIndeterminateCheckBoxChange],
  )

  const handlePaginationChange = (page: number) => {
    if (!loading) {
      onPaginationChange?.(page)
    }
  }

  const handleSelectChange = (value?: number) => {
    if (!loading) {
      onSelectChange?.(Number(value))
    }
  }

  useEffect(() => {
    if (Array.isArray(sorting)) {
      const sortOrder = sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : ''
      const id = sorting.length > 0 ? sorting[0].id : ''
      onSort?.({ order: sortOrder, key: id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting])

  const finalColumns: ColumnDef<T>[] = useMemo(() => {
    const columns = columnsProp

    if (selectable) {
      return [
        {
          id: 'select',
          header: ({ table }) => (
            <IndeterminateCheckbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              onIndeterminateCheckBoxChange={(e) => {
                handleIndeterminateCheckBoxChange(e.target.checked, table.getRowModel().rows)
              }}
            />
          ),
          cell: ({ row }) => (
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
              onCheckBoxChange={(e) => handleCheckBoxChange(e.target.checked, row.original)}
            />
          ),
          meta: {
            sticky: true,
          },
        },
        ...columns,
      ]
    }
    return columns
  }, [columnsProp, selectable, handleCheckBoxChange, handleIndeterminateCheckBoxChange])

  const table = useReactTable<T>({
    data: data as T[],
    columns: finalColumns as ColumnDef<T, any>[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: onSort ? true : false,
    getRowId,
    enableRowSelection: enableRowSelection ? (row) => enableRowSelection(row.original) : true,
    onSortingChange: (sorter) => {
      setSorting(sorter as ColumnSort[])
    },
    onRowSelectionChange: setRowSelection,
    state: {
      sorting: sorting as ColumnSort[],
      rowSelection,
    },
  })

  const resetSorting = () => {
    table.resetSorting()
  }

  const resetSelected = () => {
    table.toggleAllRowsSelected(false)
    setRowSelection({})
  }

  useImperativeHandle(ref, () => ({
    resetSorting,
    resetSelected,
  }))

  return (
    <Loading loading={loading && data.length !== 0} type="cover">
      <div
        className="overflow-y-auto"
        style={maxHeight ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : undefined}
      >
        <Table>
          <THead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sortDirection = header.column.getIsSorted()

                  const isSticky = header.column.columnDef.meta?.sticky
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      index={header.index}
                      className={classNames(
                        isSticky && 'sticky left-0 z-10 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.05)]',
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={classNames('flex items-center gap-2', canSort && 'cursor-pointer select-none')}
                          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                        >
                          <div className="flex-1">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                          {canSort && (
                            <div className="flex flex-col">
                              <span
                                className={classNames(
                                  'text-xs leading-none',
                                  sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400',
                                )}
                              >
                                ▲
                              </span>
                              <span
                                className={classNames(
                                  'text-xs leading-none',
                                  sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400',
                                )}
                              >
                                ▼
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </THead>
          {loading && data.length === 0 ? (
            <TableRowSkeleton
              // eslint-disable-next-line  @typescript-eslint/no-explicit-any
              columns={(finalColumns as Array<T>).length}
              rows={pageSize}
              avatarInColumns={skeletonAvatarColumns}
              avatarProps={skeletonAvatarProps}
            />
          ) : data.length === 0 ? (
            <EmptyState title={emptyTitle} description={emptyDescription} colSpan={(finalColumns as Array<T>).length}>
              {emptyContent}
            </EmptyState>
          ) : (
            <TBody>
              {table
                .getRowModel()
                .rows.slice(0, pageSize)
                .map((row) => {
                  const rowClassName = getRowClassName ? getRowClassName(row.original) : ''
                  return (
                    <Tr key={row.id} className={rowClassName}>
                      {row.getVisibleCells().map((cell) => {
                        const isSticky = cell.column.columnDef.meta?.sticky
                        return (
                          <Td
                            key={cell.id}
                            className={classNames(
                              isSticky && 'sticky left-0 z-10 bg-white shadow-[2px_0_4px_rgba(0,0,0,0.05)]',
                            )}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Td>
                        )
                      })}
                    </Tr>
                  )
                })}
            </TBody>
          )}
        </Table>
      </div>

      {pagingData && (data.length > 0 || loading) && (onPaginationChange || onSelectChange) && (
        <div className="flex justify-between items-center mt-4">
          <Pagination pageSize={pageSize} currentPage={pageIndex} total={total} onChange={handlePaginationChange} />
          <div style={{ minWidth: 130 }}>
            <Select
              size="sm"
              menuPlacement="top"
              isSearchable={false}
              value={pageSizeOption.filter((option) => option.value === pageSize)}
              options={pageSizeOption}
              onChange={(option) => handleSelectChange(option?.value)}
            />
          </div>
        </div>
      )}
    </Loading>
  )
}

const DataTable = forwardRef(_DataTable) as <T>(
  props: DataTableProps<T> & {
    ref?: ForwardedRef<DataTableResetHandle>
  },
) => ReturnType<typeof _DataTable>

export type { CellContext, ColumnDef, Row }
export default DataTable
