import { useCallback, useMemo } from 'react'
import { useFinalUrlStore } from '../store/useFinalUrlStore'
import { useGetFinalUrlsQuery, useDeleteFinalUrlMutation } from '../hooks/useFinalUrl'
import { DataTable } from '@/components/shared'
import { ColumnDef } from '@tanstack/react-table'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog } from '@/components/ui'
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
        message: 'Bạn có chắc chắn muốn xóa URL này?',
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
              href={row.finalURL}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-[150px] text-blue-600 hover:underline truncate"
            >
              {row.finalURL}
            </a>
          )
        },
      },
      {
        header: 'Quốc gia',
        accessorKey: 'countries',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.countries.join(', ')}</span>
        },
      },
      {
        header: '',
        id: 'actions',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex justify-end items-center gap-4">
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
