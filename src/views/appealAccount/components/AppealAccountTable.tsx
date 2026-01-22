import { ColumnDef, ConfirmDialog, DataTable, DataTableResetHandle } from '@/components/shared'
import { Button } from '@/components/ui'
import Avatar from '@/components/ui/Avatar/Avatar'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { COLUMN_CONFIG } from '@/views/appealAccount/constants/appealAccountColumnConfig.constant'
import { useDeleteAppealAccountMutation, useGetAppealAccountsQuery } from '@/views/appealAccount/hooks/useAppealAccount'
import { useAppealAccountStore } from '@/views/appealAccount/store/useAppealAccountStore'
import { AppealAccount } from '@/views/appealAccount/types/appealAccount.type'
import { useCallback, useMemo, useRef, useState } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineViewList } from 'react-icons/hi'

const CreatorColumn = ({ row }: { row: AppealAccount }) => {
  if (!row.creator) {
    return <span className="text-gray-400">Chưa có</span>
  }

  return (
    <div className="flex items-center">
      <Avatar size={32} shape="circle" src={row.creator.avatar ?? undefined} />
      <span className="rtl:mr-2 ml-2 max-w-[150px] truncate">
        {row.creator.firstName} {row.creator.lastName}
      </span>
    </div>
  )
}

export default function AppealAccountTable() {
  const { filter, setFilter, openDialog } = useAppealAccountStore()

  const { data: appealAccountsResponse, isLoading } = useGetAppealAccountsQuery()

  const deleteMutation = useDeleteAppealAccountMutation()

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa tài khoản Ads',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })
  const tableRef = useRef<DataTableResetHandle>(null)

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    COLUMN_CONFIG.forEach((col) => {
      initial[col.id] = col.visible
    })
    return initial
  })

  const metaTableData = useMemo(() => appealAccountsResponse?.meta, [appealAccountsResponse])

  const handleEdit = useCallback(
    (row: AppealAccount) => {
      openDialog(row.id)
    },
    [openDialog],
  )

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await showConfirm({
        message: `Bạn có chắc chắn muốn xóa tài khoản Ads này? Hành động này không thể hoàn tác.`,
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

  const allColumns: ColumnDef<AppealAccount>[] = useMemo(
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
        id: 'profileName',
        header: 'Tên hồ sơ',
        accessorKey: 'profileName',
        cell: (props) => {
          const row = props.row.original
          return <div className="w-[200px]">{row.profileName}</div>
        },
      },
      {
        id: 'email',
        header: 'Email',
        accessorKey: 'email',
      },
      {
        id: 'password',
        header: 'Mật khẩu',
        accessorKey: 'password',
      },
      {
        id: 'recoveryEmail',
        header: 'Mail khôi phục',
        accessorKey: 'recoveryEmail',
      },
      {
        id: 'twoFa',
        header: 'Mã 2FA',
        accessorKey: 'twoFa',
        cell: (props) => {
          const row = props.row.original
          return <div className="w-[200px]">{row.twoFa}</div>
        },
      },
      {
        id: 'mcc',
        header: 'MCC',
        accessorKey: 'mcc',
        cell: (props) => {
          const row = props.row.original
          return <div className="w-[200px]">{row.mcc}</div>
        },
      },
      {
        id: 'uid',
        header: 'UID',
        accessorKey: 'uid',
        cell: (props) => {
          const row = props.row.original
          return <div className="w-[200px]">{row.uid}</div>
        },
      },
      {
        id: 'appealPlatform',
        header: 'Sàn kháng được',
        accessorKey: 'appealPlatform',
      },
      {
        id: 'appealedBy',
        header: 'Người kháng',
        accessorKey: 'appealedBy',
      },
      {
        id: 'usedBy',
        header: 'Người sử dụng',
        accessorKey: 'usedBy',
      },
      {
        id: 'note',
        header: 'Ghi chú',
        accessorKey: 'note',
        cell: (props) => {
          const row = props.row.original
          return <div className="w-[200px]">{row.note}</div>
        },
      },
      {
        id: 'note2',
        header: 'Ghi chú 2',
        accessorKey: 'note2',
        cell: (props) => {
          const row = props.row.original
          return <div className="w-[200px]">{row.note2}</div>
        },
      },
      {
        id: 'rarityLevel',
        header: 'Cấp độ hiếm',
        accessorKey: 'rarityLevel',
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
        id: 'actions',
        header: 'Thao tác',
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
  }

  const onSelectChange = (value: number) => {
    const newFilter = { ...filter, limit: value, page: 1 }
    setFilter(newFilter)
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

      <DataTable
        ref={tableRef}
        selectable
        columns={visibleColumns}
        data={appealAccountsResponse?.items ?? []}
        skeletonAvatarColumns={[3]}
        skeletonAvatarProps={{ width: 32, height: 32 }}
        getRowId={(row) => row.id}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />

      <ConfirmDialog {...confirmProps} />
    </>
  )
}
