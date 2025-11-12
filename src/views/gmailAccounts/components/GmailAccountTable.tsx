import { GmailAccount } from '@/@types/GmailAccount'
import { DataTable } from '@/components/shared'
import { Avatar, ConfirmDialog } from '@/components/ui'
import { urlConfig } from '@/configs/urls.config'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import GmailAccountEditDialog from '@/views/GmailAccounts/components/GmailAccountEditDialog'
import { useDeleteGmailAccountMutation, useGetGmailAccountsQuery } from '@/views/gmailAccounts/hooks/useGmailAccount'
import { useGmailAccountStore } from '@/views/GmailAccounts/store/useGmailAccountStore'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const ManagerColumn = ({ row }: { row: GmailAccount }) => {
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

const CreatorColumn = ({ row }: { row: GmailAccount }) => {
  if (!row.creator) {
    return <span className="text-gray-400">Chưa có</span>
  }

  return (
    <div className="flex items-center">
      <Avatar size={32} shape="circle" src={row.creator.avatar ?? ''} />
      <span className="rtl:mr-2 ml-2 max-w-[150px] truncate">
        {row.creator.firstName} {row.creator.lastName}
      </span>
    </div>
  )
}

export default function GmailAccountTable() {
  const { filter, setFilter, setDialogOpen, setSelectedGmailAccount } = useGmailAccountStore()
  const { data: getGmailAccountsResponse, isLoading } = useGetGmailAccountsQuery()
  const deleteGmailAccountMutation = useDeleteGmailAccountMutation()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa gmail',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getGmailAccountsResponse?.meta, [getGmailAccountsResponse])

  const handleEdit = (row: GmailAccount) => {
    setSelectedGmailAccount(row)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa tài khoản gmail này? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteGmailAccountMutation.mutateAsync(id)
    }
  }

  const columns: ColumnDef<GmailAccount>[] = [
    {
      header: 'STT',
      accessorKey: 'index',
      cell: (props) => {
        const row = props.row.index
        return <span>{(filter.page - 1) * filter.limit + row + 1}</span>
      },
    },
    {
      header: 'Proxy',
      accessorKey: 'proxy',
    },
    {
      header: 'Email',
      accessorKey: 'name',
      cell: (props) => {
        const row = props.row.original
        return (
          <Link to={urlConfig.gmailAccountDetail.replace(':id', row.id)} className="hover:text-indigo-600">
            {row.name}
          </Link>
        )
      },
    },
    {
      header: 'Mail khôi phục',
      accessorKey: 'recoverMail',
    },
    {
      header: 'Mã 2FA',
      accessorKey: 'code2fa',
    },
    {
      header: 'Giá tiền',
      accessorKey: 'price',
      cell: (props) => {
        const row = props.row.original
        return <span>{formatVietnameseMoney(row.price)}</span>
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
      header: 'Người tạo',
      accessorKey: 'creator',
      cell: (props) => {
        const row = props.row.original
        return <CreatorColumn row={row} />
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
        data={getGmailAccountsResponse?.items ?? []}
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

      <GmailAccountEditDialog />
      <ConfirmDialog {...confirmProps} loading={deleteGmailAccountMutation.isPending} />
    </>
  )
}
