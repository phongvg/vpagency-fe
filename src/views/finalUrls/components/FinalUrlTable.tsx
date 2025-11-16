import { useCallback, useMemo } from 'react'
import { useFinalUrlStore } from '../store/useFinalUrlStore'
import { useGetFinalUrlsQuery, useDeleteFinalUrlMutation } from '../hooks/useFinalUrl'
import { DataTable } from '@/components/shared'
import { ColumnDef } from '@tanstack/react-table'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { Badge, ConfirmDialog } from '@/components/ui'
import { FinalUrl } from '../types/finalUrl.type'

export default function FinalUrlTable() {
  const { filter, openDialog, setFilter } = useFinalUrlStore()

  const { data: getFinalUrlsResponse, isLoading } = useGetFinalUrlsQuery()
  const deleteFinalUrlMutation = useDeleteFinalUrlMutation()

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getFinalUrlsResponse?.meta, [getFinalUrlsResponse])

  const handleEdit = useCallback(
    (finalUrl: FinalUrl) => {
      openDialog(finalUrl.id)
    },
    [openDialog],
  )

  const handleDelete = useCallback(
    async (finalUrl: FinalUrl) => {
      const confirmed = await showConfirm({
        message: `Bạn có chắc chắn muốn xóa URL "${finalUrl.url}"?`,
      })

      if (confirmed && finalUrl.id) {
        await deleteFinalUrlMutation.mutateAsync(finalUrl.id)
      }
    },
    [deleteFinalUrlMutation, showConfirm],
  )

  const columns: ColumnDef<FinalUrl>[] = useMemo(
    () => [
      {
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{(filter.page - 1) * filter.limit + row + 1}</span>
        },
      },
      {
        header: 'Tên URL',
        accessorKey: 'name',
        cell: (props) => {
          const row = props.row.original
          return <span className="font-medium">{row.name}</span>
        },
      },
      {
        header: 'URL',
        accessorKey: 'url',
        cell: (props) => {
          const row = props.row.original
          return (
            <a
              href={row.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-xs text-blue-600 hover:underline truncate"
            >
              {row.url}
            </a>
          )
        },
      },
      {
        header: 'Quốc gia',
        accessorKey: 'country',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.country}</span>
        },
      },
      {
        header: 'Ref Target',
        accessorKey: 'refTarget',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.refTarget}</span>
        },
      },
      {
        header: 'FTD Target',
        accessorKey: 'ftdTarget',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.ftdTarget}</span>
        },
      },
      {
        header: 'Ngân sách',
        accessorKey: 'budget',
        cell: (props) => {
          const row = props.row.original
          return <span>${row.budget.toLocaleString()}</span>
        },
      },
      {
        header: 'CPC',
        accessorKey: 'cpc',
        cell: (props) => {
          const row = props.row.original
          return <span>${row.cpc}</span>
        },
      },
      {
        header: 'Clicks',
        accessorKey: 'clickCount',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.clickCount}</span>
        },
      },
      {
        header: 'Trạng thái',
        accessorKey: 'active',
        cell: (props) => {
          const row = props.row.original
          return (
            <Badge className={row.active ? 'bg-green-500' : 'bg-gray-500'}>
              {row.active ? 'Kích hoạt' : 'Vô hiệu'}
            </Badge>
          )
        },
      },
      {
        header: '',
        id: 'actions',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => handleEdit(row)}>
                <HiOutlinePencilAlt size={24} />
              </button>
              <button type="button" onClick={() => handleDelete(row)}>
                <HiOutlineTrash size={24} />
              </button>
            </div>
          )
        },
      },
    ],
    [filter, handleDelete, handleEdit],
  )

  const onPaginationChange = (page: number) => {
    const newFilter = { ...filter, page }
    setFilter(newFilter)
  }

  const onSelectChange = (value: number) => {
    const newFilter = { ...filter, limit: value, page: 1 }
    setFilter(newFilter)
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={getFinalUrlsResponse?.items || []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <ConfirmDialog {...confirmProps} loading={deleteFinalUrlMutation.isPending} />
    </>
  )
}
