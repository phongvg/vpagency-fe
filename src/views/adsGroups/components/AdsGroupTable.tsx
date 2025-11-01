import { useMemo } from 'react'
import { useGetAdsGroupsQuery, useDeleteAdsGroupMutation } from '@/views/adsGroups/hooks/useAdsGroupsQueries'
import { ColumnDef } from '@tanstack/react-table'
import { AdsGroup } from '@/@types/adsGroup'
import { Avatar, Button } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useAdsGroupStore } from '@/views/adsGroups/store/useAdsGroupStore'
import dayjs from 'dayjs'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import AdsGroupEditDialog from '@/views/adsGroups/components/AdsGroupEditDialog'

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

  const metaTableData = useMemo(() => getAdsGroupsResponse?.meta, [getAdsGroupsResponse])

  const handleEdit = (row: AdsGroup) => {
    setSelectedAdsGroup(row)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa nhóm quảng cáo này?')) {
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
          return <span>{row.name}</span>
        },
      },
      {
        header: 'Mô tả',
        accessorKey: 'description',
        cell: (props) => {
          const row = props.row.original
          return <span className="max-w-[200px] truncate">{row.description || '-'}</span>
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
          return <div className="flex items-center">{dayjs(row.createdAt).format('DD/MM/YYYY HH:mm')}</div>
        },
      },
      {
        header: 'Ngày cập nhật',
        accessorKey: 'updatedAt',
        cell: (props) => {
          const row = props.row.original
          return <div className="flex items-center">{dayjs(row.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
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
    [filter.page, filter.limit, deleteAdsGroupMutation.isPending],
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
        data={getAdsGroupsResponse?.data ?? []}
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
    </>
  )
}
