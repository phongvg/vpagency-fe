import { UidStatus } from '@/@types/uidStatus'
import { DataTable } from '@/components/shared'
import { ConfirmDialog, Switcher } from '@/components/ui'
import { formatDate } from '@/helpers/formatDate'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import UidStatusEditDialog from '@/views/masterData/uidStatus/components/UidStatusEditDialog'
import {
  useDeleteUidStatusMutation,
  useGetUidStatusesQuery,
  useUpdateUidStatusMutation,
} from '@/views/masterData/uidStatus/hooks/useUidStatus'
import { useUidStatusStore } from '@/views/masterData/uidStatus/store/useUidStatusStore'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'

export default function UidStatusTable() {
  const { filter, setFilter, setDialogOpen, setSelectedUidStatus } = useUidStatusStore()

  const { data: getUidStatusesResponse, isLoading } = useGetUidStatusesQuery()

  const updateUidStatusMutation = useUpdateUidStatusMutation()
  const deleteUidStatusMutation = useDeleteUidStatusMutation()

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa trạng thái UID',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getUidStatusesResponse?.meta, [getUidStatusesResponse])

  const handleEdit = (row: UidStatus) => {
    setSelectedUidStatus(row)
    setDialogOpen(true)
  }

  const handleUpdateStatusActive = async (row: UidStatus, active: boolean) => {
    await updateUidStatusMutation.mutateAsync({
      id: row.id,
      payload: { active },
    })
  }

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa trạng thái UID này? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteUidStatusMutation.mutateAsync(id)
    }
  }

  const columns: ColumnDef<UidStatus>[] = [
    {
      header: 'STT',
      accessorKey: 'index',
      cell: (props) => {
        const row = props.row.index
        return <span>{(filter.page - 1) * filter.limit + row + 1}</span>
      },
    },
    {
      header: 'Tên trạng thái',
      accessorKey: 'name',
    },
    {
      header: 'Hoạt động',
      accessorKey: 'active',
      cell: (props) => {
        const row = props.row.original
        return <Switcher checked={row.active} onChange={() => handleUpdateStatusActive(row, !row.active)} />
      },
    },
    {
      header: 'Ngày tạo',
      accessorKey: 'createdAt',
      cell: (props) => {
        const row = props.row.original
        return <span>{formatDate(row.createdAt)}</span>
      },
    },
    {
      header: 'Ngày cập nhật',
      accessorKey: 'updatedAt',
      cell: (props) => {
        const row = props.row.original
        return <span>{formatDate(row.updatedAt)}</span>
      },
    },
    {
      header: '',
      accessorKey: 'action',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="flex justify-end items-center gap-4">
            <button type="button" onClick={() => handleEdit(row)}>
              <HiOutlinePencilAlt size={24} />
            </button>
            <button type="button" onClick={() => handleDelete(row.id)}>
              <HiOutlineTrash size={24} />
            </button>
          </div>
        )
      },
    },
  ]

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
        data={getUidStatusesResponse?.items ?? []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <UidStatusEditDialog />
      <ConfirmDialog {...confirmProps} />
    </>
  )
}
