import { GmailAccount } from '@/views/gmailAccounts/types/gmailAccount.type'
import { DataTable, DataTableResetHandle } from '@/components/shared'
import { Avatar, Button, ConfirmDialog } from '@/components/ui'
import { urlConfig } from '@/configs/urls.config'
import { formatVietnameseMoney } from '@/helpers/formatVietnameseMoney'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import GmailAccountEditDialog from '@/views/gmailAccounts/components/GmailAccountEditDialog'
import {
  useAssignGmailAccountToSelfMutation,
  useDeleteGmailAccountMutation,
  useGetGmailAccountsQuery,
} from '@/views/gmailAccounts/hooks/useGmailAccount'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'
import { ColumnDef, Row } from '@tanstack/react-table'
import { useMemo, useRef, useState } from 'react'
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
  const { filter, setFilter, openDialog } = useGmailAccountStore()

  const { data: getGmailAccountsResponse, isLoading } = useGetGmailAccountsQuery()

  const deleteMutation = useDeleteGmailAccountMutation()
  const assignMutation = useAssignGmailAccountToSelfMutation()

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa gmail',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const { showConfirm: showBatchConfirm, confirmProps: batchConfirmProps } = useConfirmDialog({
    title: 'Xác nhận',
    type: 'warning',
    confirmText: 'Xác nhận',
    cancelText: 'Hủy',
  })

  const tableRef = useRef<DataTableResetHandle>(null)

  const [selectedRows, setSelectedRows] = useState<GmailAccount[]>([])

  const metaTableData = useMemo(() => getGmailAccountsResponse?.meta, [getGmailAccountsResponse])

  const handleEdit = (row: GmailAccount) => {
    openDialog(row.id)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa tài khoản gmail này? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteMutation.mutateAsync(id)
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

  const handleCheckBoxChange = (checked: boolean, row: GmailAccount) => {
    if (checked) {
      setSelectedRows([...selectedRows, row])
    } else {
      setSelectedRows(selectedRows.filter((r) => r.id !== row.id))
    }
  }

  const handleIndeterminateCheckBoxChange = (checked: boolean, rows: Row<GmailAccount>[]) => {
    if (checked) {
      setSelectedRows(rows.map((r) => r.original))
    } else {
      setSelectedRows([])
    }
  }

  const handleBulkAssign = async () => {
    if (selectedRows.length === 0) return

    const confirmed = await showBatchConfirm({
      message: `Bạn có chắc chắn muốn nhận ${selectedRows.length} gmail này?`,
    })

    if (confirmed) {
      await Promise.all(
        selectedRows.map(async (row) => {
          await assignMutation.mutateAsync(row.id)
        }),
      )

      tableRef.current?.resetSelected()
      setSelectedRows([])
    }
  }

  return (
    <>
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-4 bg-blue-50 mb-4 p-4 rounded">
          <span className="font-medium">Đã chọn {selectedRows.length} tài khoản</span>
          <Button size="sm" variant="solid" onClick={handleBulkAssign}>
            Nhận Gmail
          </Button>
          <Button
            size="sm"
            onClick={() => {
              tableRef.current?.resetSelected()
              setSelectedRows([])
            }}
          >
            Bỏ chọn
          </Button>
        </div>
      )}

      <DataTable
        ref={tableRef}
        selectable
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
        onCheckBoxChange={handleCheckBoxChange}
        onIndeterminateCheckBoxChange={handleIndeterminateCheckBoxChange}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />

      <GmailAccountEditDialog />
      <ConfirmDialog {...confirmProps} loading={deleteMutation.isPending} />
      <ConfirmDialog {...batchConfirmProps} />
    </>
  )
}
