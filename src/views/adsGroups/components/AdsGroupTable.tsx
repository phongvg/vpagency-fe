import { useMemo } from 'react'
import { useGetAdsGroupsQuery, useDeleteAdsGroupMutation } from '@/views/adsGroups/hooks/useAdsGroupsQueries'
import { ColumnDef } from '@tanstack/react-table'
import { AdsGroup } from '@/@types/adsGroup'
import { Avatar, ConfirmDialog } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useAdsGroupStore } from '@/views/adsGroups/store/useAdsGroupStore'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import AdsGroupEditDialog from '@/views/adsGroups/components/AdsGroupEditDialog'
import { formatDate } from '@/helpers/formatDate'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { Link } from 'react-router-dom'
import { urlConfig } from '@/configs/urls.config'

const ManagerColumn = ({ row }: { row: AdsGroup }) => {
  if (!row.manager) {
    return <span className="text-gray-400">Chưa có</span>
  }

  return (
    <div className="flex items-center">
      <Avatar size={32} shape="circle" src={row.manager.avatar ?? ''} />
      <span className="rtl:mr-2 ml-2 max-w-[150px] truncate">
        {row.manager.firstName} {row.manager.lastName}
      </span>
    </div>
  )
}

export default function AdsGroupTable() {
  const { filter, setFilter, setDialogOpen, setSelectedAdsGroup } = useAdsGroupStore()
  const { data: getAdsGroupsResponse, isLoading } = useGetAdsGroupsQuery()
  const deleteAdsGroupMutation = useDeleteAdsGroupMutation()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa nhóm',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getAdsGroupsResponse?.meta, [getAdsGroupsResponse])

  const handleEdit = (row: AdsGroup) => {
    setSelectedAdsGroup(row)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa nhóm tài khoản này? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteAdsGroupMutation.mutateAsync(id)
    }
  }

  const columns: ColumnDef<AdsGroup>[] = useMemo(
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
        header: 'Tên nhóm',
        accessorKey: 'name',
        cell: (props) => {
          const row = props.row.original
          return (
            <Link to={urlConfig.adsGroupDetail.replace(':id', row.id)} className="hover:text-indigo-600">
              {row.name}
            </Link>
          )
        },
      },
      {
        header: 'Người quản lý',
        accessorKey: 'manager',
        cell: (props) => {
          const row = props.row.original
          return <ManagerColumn row={row} />
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
            <div className="flex items-center gap-4">
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
    ],
    [filter, deleteAdsGroupMutation],
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
        data={getAdsGroupsResponse?.items ?? []}
        skeletonAvatarColumns={[3]}
        skeletonAvatarProps={{ width: 32, height: 32 }}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />

      <AdsGroupEditDialog />
      <ConfirmDialog {...confirmProps} loading={deleteAdsGroupMutation.isPending} />
    </>
  )
}
