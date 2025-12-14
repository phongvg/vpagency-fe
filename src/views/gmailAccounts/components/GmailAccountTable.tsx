import { DataTable, DataTableResetHandle } from '@/components/shared'
import BadgeStatus from '@/components/shared/BadgeStatus'
import { Avatar, Button, Checkbox, ConfirmDialog, Dropdown } from '@/components/ui'
import { formatUSD } from '@/helpers/formatUSD'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import GmailAccountEditDialog from '@/views/gmailAccounts/components/GmailAccountEditDialog'
import GmailAccountPreviewDialog from '@/views/gmailAccounts/components/GmailAccountPreviewDialog'
import { COLUMN_CONFIG } from '@/views/gmailAccounts/constants/gmailAccountColumnConfig.constant'
import {
  useAssignGmailAccountToSelfMutation,
  useDeleteGmailAccountMutation,
  useGetGmailAccountsQuery,
} from '@/views/gmailAccounts/hooks/useGmailAccount'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'
import { GmailAccount } from '@/views/gmailAccounts/types/gmailAccount.type'
import UsersAvatarGroup from '@/views/tasks/assign/components/UsersAvatarGroup'
import { ColumnDef, Row } from '@tanstack/react-table'
import { useCallback, useMemo, useRef, useState } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineViewList } from 'react-icons/hi'

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

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    COLUMN_CONFIG.forEach((col) => {
      initial[col.id] = col.visible
    })
    return initial
  })

  const metaTableData = useMemo(() => getGmailAccountsResponse?.meta, [getGmailAccountsResponse])

  const handleEdit = useCallback(
    (row: GmailAccount) => {
      openDialog(row.id)
    },
    [openDialog],
  )

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await showConfirm({
        message: `Bạn có chắc chắn muốn xóa tài khoản gmail này? Hành động này không thể hoàn tác.`,
      })

      if (confirmed) {
        await deleteMutation.mutateAsync(id)
      }
    },
    [deleteMutation, showConfirm],
  )

  const toggleColumnVisibility = useCallback((columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }))
  }, [])

  const allColumns: ColumnDef<GmailAccount>[] = useMemo(
    () => [
      {
        id: 'stt',
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{(filter.page - 1) * filter.limit + row + 1}</span>
        },
      },
      {
        id: 'name',
        header: 'Email',
        accessorKey: 'name',
      },
      {
        id: 'status',
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (props) => <BadgeStatus content={props.row.original.status.name} />,
      },
      {
        id: 'creator',
        header: 'Người tạo',
        accessorKey: 'creator',
        cell: (props) => {
          const row = props.row.original
          return <CreatorColumn row={row} />
        },
      },
      {
        id: 'proxy',
        header: 'Proxy',
        accessorKey: 'proxy',
      },
      {
        id: 'password',
        header: 'Mật khẩu',
        accessorKey: 'password',
      },
      {
        id: 'recoverMail',
        header: 'Mail khôi phục',
        accessorKey: 'recoverMail',
      },
      {
        id: 'code2fa',
        header: 'Mã 2FA',
        accessorKey: 'code2fa',
      },
      {
        id: 'price',
        header: 'Giá tiền',
        accessorKey: 'price',
        cell: (props) => {
          const row = props.row.original
          return <span>{formatUSD(row.price)}</span>
        },
      },
      {
        id: 'assignedUsers',
        header: 'Người nhận mail',
        accessorKey: 'assignedUsers',
        cell: (props) => {
          const row = props.row.original
          return <UsersAvatarGroup users={row.assignedUsers} />
        },
      },
      {
        id: 'phone',
        header: 'Số điện thoại',
        accessorKey: 'phone',
      },
      {
        id: 'createdYear',
        header: 'Năm tạo',
        accessorKey: 'createdYear',
      },
      {
        id: 'profileName',
        header: 'Tên hồ sơ',
        accessorKey: 'profileName',
      },
      {
        id: 'action',
        header: '',
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
    ],
    [filter, handleDelete, handleEdit],
  )

  const isAllColumnsVisible = useMemo(() => {
    return COLUMN_CONFIG.every((col) => col.required || columnVisibility[col.id])
  }, [columnVisibility])

  const toggleAllColumns = useCallback(() => {
    const allVisible = COLUMN_CONFIG.every((col) => col.required || columnVisibility[col.id])

    setColumnVisibility((prev) => {
      const updated = { ...prev }
      COLUMN_CONFIG.forEach((col) => {
        if (!col.required) {
          updated[col.id] = !allVisible
        }
      })
      return updated
    })
  }, [columnVisibility])

  const visibleColumns = useMemo(() => {
    return allColumns.filter((col) => columnVisibility[col.id as string])
  }, [allColumns, columnVisibility])

  const onPaginationChange = (page: number) => {
    const newFilter = { ...filter, page }
    setFilter(newFilter)
    tableRef.current?.resetSelected()
    setSelectedRows([])
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
      <div className="flex justify-between items-center mb-4">
        <Dropdown
          renderTitle={
            <Button size="sm" variant="twoTone" icon={<HiOutlineViewList />}>
              Tùy chỉnh cột
            </Button>
          }
        >
          <div className="p-2 max-h-96 overflow-y-auto" style={{ minWidth: '250px' }}>
            <div className="flex items-center gap-2 hover:bg-gray-50 mb-2 px-2 py-1.5 pb-2 border-gray-200 border-b rounded">
              <Checkbox checked={isAllColumnsVisible} onChange={toggleAllColumns} />
              <span className="font-medium text-sm">Tất cả</span>
            </div>
            {COLUMN_CONFIG.map((col) => (
              <div key={col.id} className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded">
                <Checkbox
                  checked={columnVisibility[col.id]}
                  disabled={col.required}
                  onChange={() => toggleColumnVisibility(col.id)}
                />
                <span className="text-sm">{col.label}</span>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>

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
        columns={visibleColumns}
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
      <GmailAccountPreviewDialog />
      <ConfirmDialog {...confirmProps} loading={deleteMutation.isPending} />
      <ConfirmDialog {...batchConfirmProps} />
    </>
  )
}
