import { useMemo } from 'react'
import { useGetAdsAccountsQuery, useDeleteAdsAccountMutation } from '@/views/adsAccounts/hooks/useAdsAccountsQueries'
import { ColumnDef } from '@tanstack/react-table'
import { AdsAccount } from '@/@types/adsAccount'
import { Avatar, Badge, ConfirmDialog } from '@/components/ui'
import { DataTable } from '@/components/shared'
import { useAdsAccountStore } from '@/views/adsAccounts/store/useAdsAccountStore'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import AdsAccountEditDialog from '@/views/adsAccounts/components/AdsAccountEditDialog'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { formatDate } from '@/helpers/formatDate'
import { AdsAccountStatusColors, AdsAccountStatusLabels } from '@/enums/adsAccount.enum'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'

const ManagerColumn = ({ row }: { row: AdsAccount }) => {
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

export default function AdsAccountTable() {
  const { filter, setFilter, setDialogOpen, setSelectedAdsAccount } = useAdsAccountStore()
  const { data: getAdsAccountsResponse, isLoading } = useGetAdsAccountsQuery()
  const deleteAdsAccountMutation = useDeleteAdsAccountMutation()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa tài khoản',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getAdsAccountsResponse?.meta, [getAdsAccountsResponse])

  const handleEdit = (row: AdsAccount) => {
    setSelectedAdsAccount(row)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa tài khoản quảng cáo này? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteAdsAccountMutation.mutateAsync(id)
    }
  }

  const columns: ColumnDef<AdsAccount>[] = useMemo(
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
        header: 'UUID',
        accessorKey: 'uuid',
      },
      {
        header: 'Gmail',
        accessorKey: 'gmail',
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-2">
              <Badge className={`bg-${AdsAccountStatusColors[row.status]}`} />
              <span className={`capitalize font-semibold text-${AdsAccountStatusColors[row.status]}`}>
                {AdsAccountStatusLabels[row.status]}
              </span>
            </div>
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
        header: 'Tổng chi tiêu',
        accessorKey: 'totalSpent',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatVietnameseMoney(row.totalSpent)}</span>
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
    [filter.page, filter.limit, deleteAdsAccountMutation.isPending],
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
        data={getAdsAccountsResponse?.items ?? []}
        skeletonAvatarColumns={[4]}
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

      <AdsAccountEditDialog />
      <ConfirmDialog {...confirmProps} loading={deleteAdsAccountMutation.isPending} />
    </>
  )
}
