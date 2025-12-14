import { ColumnDef, DataTable, DataTableResetHandle, Row } from '@/components/shared'
import BadgeStatus from '@/components/shared/BadgeStatus'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { Button, Checkbox, ConfirmDialog, Dialog, Dropdown } from '@/components/ui'
import { addDash } from '@/helpers/addDash'
import { convertNumberToPercent } from '@/helpers/convertNumberToPercent'
import { fixedNumber } from '@/helpers/fixedNumber'
import { formatDate } from '@/helpers/formatDate'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { toastError, toastSuccess } from '@/utils/toast'
import { COLUMN_CONFIG } from '@/views/campaign/constants/campaignColumnConfig.constant'
import { CampaignFilterRequest } from '@/views/campaign/store/useCampaignStore'
import { Campaign } from '@/views/campaign/types/campaign.type'
import CampaignStatsFilter from '@/views/tasks/assign/components/CampaignStatsFilter'
import {
  useAssignCampaignsToFinalUrlMutation,
  useGetCampaignStatsByFinalUrl,
  useRemoveCampaignsFromFinalUrlMutation,
} from '@/views/tasks/assign/hooks/useTask'
import { useCallback, useMemo, useRef, useState } from 'react'
import { HiOutlineDuplicate, HiOutlineMinusSm, HiOutlineViewList } from 'react-icons/hi'

type Props = {
  isOpen: boolean
  taskId: string
  finalUrlId: string | null
  onClose: () => void
}

export default function CampaignStatsModal({ isOpen, taskId, finalUrlId, onClose }: Props) {
  const [filter, setFilter] = useState<CampaignFilterRequest>({
    page: 1,
    limit: 10,
  })

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    COLUMN_CONFIG.forEach((col) => {
      initial[col.id] = col.visible
    })
    return initial
  })

  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const { data, isLoading } = useGetCampaignStatsByFinalUrl(taskId, finalUrlId, filter, isOpen)
  const assignMutation = useAssignCampaignsToFinalUrlMutation()
  const removeMutation = useRemoveCampaignsFromFinalUrlMutation()

  const metaTableData = useMemo(() => data?.meta, [data])

  const tableRef = useRef<DataTableResetHandle>(null)

  const { showConfirm: showBatchConfirm, confirmProps: batchConfirmProps } = useConfirmDialog({
    title: 'Xác nhận',
    type: 'warning',
    confirmText: 'Xác nhận',
    cancelText: 'Hủy',
  })

  const { showConfirm: showDeleteConfirm, confirmProps: deleteConfirmProps } = useConfirmDialog({
    title: 'Xác nhận',
    type: 'warning',
    confirmText: 'Xác nhận',
    cancelText: 'Hủy',
  })

  const handleResetSelection = () => {
    setSelectedRows([])
    tableRef.current?.resetSelected()
  }

  const toggleColumnVisibility = useCallback((columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }))
  }, [])

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

  const handleCopyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toastSuccess('Đã sao chép vào clipboard')
      },
      () => {
        toastError('Sao chép thất bại')
      },
    )
  }, [])

  const handleRemoveAssign = useCallback(
    async (id: string) => {
      const confirmed = await showDeleteConfirm({
        message: `Bạn có chắc chắn muốn loại bỏ chỉ số của chiến dịch này không?`,
      })

      if (confirmed) {
        await removeMutation.mutateAsync(
          {
            id: taskId,
            payload: {
              finalUrlId: finalUrlId!,
              campaignDailyStatId: id,
            },
          },
          {
            onSuccess: () => {
              onClose()
              handleResetSelection()
            },
          },
        )
      }
    },
    [finalUrlId, onClose, removeMutation, showDeleteConfirm, taskId],
  )

  const allColumns: ColumnDef<Campaign>[] = useMemo(
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
        id: 'importAt',
        header: 'Ngày nhập',
        accessorKey: 'importAt',
        cell: (props) => <span>{formatDate(props.row.original.importAt, 'DD/MM/YYYY')}</span>,
      },
      {
        id: 'date',
        header: 'Dữ liệu ngày',
        accessorKey: 'date',
        cell: (props) => <span>{formatDate(props.row.original.date, 'DD/MM/YYYY')}</span>,
      },
      {
        id: 'uid',
        header: 'UID',
        accessorKey: 'uid',
        cell: (props) => (
          <div className="flex items-center gap-2">
            {addDash(props.row.original.uid)}
            <button
              type="button"
              title="Sao chép"
              onClick={() => handleCopyToClipboard(addDash(props.row.original.uid) || '')}
            >
              <HiOutlineDuplicate />
            </button>
          </div>
        ),
      },
      {
        id: 'externalId',
        header: 'ID chiến dịch',
        accessorKey: 'externalId',
        cell: (props) => (
          <div className="flex items-center gap-2">
            {props.row.original.externalId}
            <button
              type="button"
              title="Sao chép"
              onClick={() => handleCopyToClipboard(props.row.original.externalId || '')}
            >
              <HiOutlineDuplicate />
            </button>
          </div>
        ),
      },
      {
        id: 'name',
        header: 'Tên chiến dịch',
        accessorKey: 'name',
        cell: (props) => <span>{props.row.original.name}</span>,
      },
      {
        id: 'finalUrl',
        header: 'URL',
        accessorKey: 'finalUrl',
        cell: (props) => (
          <a
            href={props.row.original.finalUrlImport || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-xs text-blue-600 hover:underline truncate"
            title={props.row.original.finalUrlImport || ''}
          >
            {props.row.original.finalUrlImport}
          </a>
        ),
      },
      {
        id: 'statusCampaign',
        header: 'Trạng thái chiến dịch',
        accessorKey: 'status',
        cell: (props) => <BadgeStatus content={props.row.original.status} />,
      },
      {
        id: 'mcc',
        header: 'MCC',
        accessorKey: 'mcc',
        cell: (props) => <span>{addDash(props.row.original.mcc)}</span>,
      },
      {
        id: 'avgCpc',
        header: 'CPC trung bình',
        accessorKey: 'avgCpc',
        cell: (props) => <span>${fixedNumber(props.row.original.avgCpc)}</span>,
      },
      {
        id: 'targetCpc',
        header: 'Thầu chung',
        accessorKey: 'targetCpc',
        cell: (props) => <span>${fixedNumber(props.row.original.targetCpc)}</span>,
      },
      {
        id: 'clicks',
        header: 'Click',
        accessorKey: 'clicks',
      },
      {
        id: 'ctr',
        header: 'CTR',
        accessorKey: 'ctr',
        cell: (props) => {
          const row = props.row.original.ctr
          return <span>{convertNumberToPercent(row)}</span>
        },
      },
      {
        id: 'cpm',
        header: 'CPM',
        accessorKey: 'cpm',
        cell: (props) => <span>{fixedNumber(props.row.original.cpm)}</span>,
      },
      {
        id: 'cost',
        header: 'Ngân sách chi tiêu',
        accessorKey: 'cost',
        cell: (props) => <span>${fixedNumber(props.row.original.cost)}</span>,
      },
      {
        id: 'impression',
        header: 'Lượt hiển thị',
        accessorKey: 'impression',
      },
      {
        id: 'campaignBudget',
        header: 'Ngân sách chiến dịch',
        accessorKey: 'campaignBudget',
        cell: (props) => <span>${fixedNumber(props.row.original.campaignBudget)}</span>,
      },
      {
        id: 'keywords',
        header: 'Từ khóa',
        cell: (props) => {
          const keywords = props.row.original.keywords || []
          if (keywords.length === 0) return null

          return (
            <TableTooltip
              data={keywords.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
              columns={[
                { key: 'keyword', label: 'Từ khóa' },
                { key: 'match', label: 'Hình thức' },
                { key: 'bid', label: 'Bid' },
                { key: 'clicks', label: 'Click' },
                { key: 'impression', label: 'Lượt hiển thị' },
                { key: 'ctr', label: 'CTR' },
                { key: 'cpc', label: 'CPC' },
                { key: 'cpm', label: 'CPM' },
                { key: 'cost', label: 'Chi phí' },
              ]}
            />
          )
        },
      },
      {
        id: 'negativeKeywords',
        header: 'Từ khóa không tìm kiếm',
        cell: (props) => {
          const keywords = props.row.original.negativeKeywords || []
          if (keywords.length === 0) return null

          return (
            <TableTooltip
              data={keywords.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
              columns={[
                { key: 'keyword', label: 'Từ khóa' },
                { key: 'match', label: 'Hình thức' },
              ]}
            />
          )
        },
      },
      {
        id: 'topSearchTerms',
        header: 'Thuật ngữ tìm kiếm',
        cell: (props) => {
          const terms = props.row.original.topSearchTerms || []
          if (terms.length === 0) return ''

          return (
            <TableTooltip
              data={terms.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
              columns={[
                { key: 'term', label: 'Thuật ngữ' },
                { key: 'clicks', label: 'Click' },
                { key: 'impression', label: 'Lượt hiển thị' },
                { key: 'ctr', label: 'CTR' },
                { key: 'cpc', label: 'CPC' },
                { key: 'cpm', label: 'CPM' },
                { key: 'cost', label: 'Chi phí' },
              ]}
            />
          )
        },
      },
      {
        id: 'targetLocations',
        header: 'Quốc gia mục tiêu',
        accessorKey: 'targetLocations',
        cell: (props) => {
          const locations = props.row.original.targetLocations || []
          if (locations.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={locations.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(locations.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        id: 'locationExcluded',
        header: 'Quốc gia loại trừ',
        accessorKey: 'locationExcluded',
        cell: (props) => {
          const locations = props.row.original.locationExcluded || []
          if (locations.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={locations.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(locations.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        id: 'locationStats',
        header: 'Thống kê quốc gia',
        accessorKey: 'locationStats',
        cell: (props) => {
          const stats = props.row.original.locationStats || []
          if (stats.length === 0) return null

          return (
            <TableTooltip
              data={stats.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
              columns={[
                { key: 'location', label: 'Quốc gia' },
                { key: 'clicks', label: 'Click' },
                { key: 'impression', label: 'Lượt hiển thị' },
                { key: 'ctr', label: 'CTR' },
                { key: 'cpc', label: 'CPC' },
                { key: 'cpm', label: 'CPM' },
                { key: 'cost', label: 'Chi phí' },
              ]}
            />
          )
        },
      },
      {
        id: 'actions',
        header: '',
        cell: (props) => {
          const row = props.row.original
          if (!row.finalUrlId) return null

          return (
            <div className="flex justify-end items-center gap-4">
              <button type="button" title="Loại bỏ chỉ số" onClick={() => handleRemoveAssign(row.id)}>
                <HiOutlineMinusSm size={24} />
              </button>
            </div>
          )
        },
      },
    ],
    [filter, handleCopyToClipboard, handleRemoveAssign],
  )

  const isAllColumnsVisible = useMemo(() => {
    return COLUMN_CONFIG.every((col) => col.required || columnVisibility[col.id])
  }, [columnVisibility])

  const visibleColumns = useMemo(() => {
    return allColumns.filter((col) => columnVisibility[col.id as string])
  }, [allColumns, columnVisibility])

  const onPaginationChange = (page: number) => {
    const newFilter = { ...filter, page }
    setFilter(newFilter)
    handleResetSelection()
  }

  const onSelectChange = (value: number) => {
    const newFilter = { ...filter, limit: value, page: 1 }
    setFilter(newFilter)
  }

  const handleCheckBoxChange = (checked: boolean, row: Campaign) => {
    if (checked) {
      setSelectedRows((prevData) => {
        if (!prevData.includes(row.id)) {
          return [...prevData, ...[row.id]]
        }
        return prevData
      })
    } else {
      setSelectedRows((prevData) => {
        if (prevData.includes(row.id)) {
          return prevData.filter((id) => id !== row.id)
        }
        return prevData
      })
    }
  }

  const handleIndeterminateCheckBoxChange = (checked: boolean, rows: Row<Campaign>[]) => {
    if (checked) {
      const originalRows = rows.map((row) => row.original)
      const selectedIds: string[] = []
      originalRows.forEach((row) => {
        if (!row.finalUrlId) {
          selectedIds.push(row.id)
        }
      })
      setSelectedRows(selectedIds)
    } else {
      setSelectedRows([])
    }
  }

  const handleBulkAssign = async () => {
    if (selectedRows.length === 0) return

    const confirmed = await showBatchConfirm({
      message: `Bạn có chắc chắn muốn gán ${selectedRows.length} chiến dịch đã chọn không?`,
    })

    if (confirmed) {
      await assignMutation.mutateAsync(
        {
          id: taskId,
          payload: {
            finalUrlId: finalUrlId!,
            campaignDailyStatIds: selectedRows,
          },
        },
        {
          onSuccess: () => {
            onClose()
            handleResetSelection()
          },
        },
      )
    }
  }

  const onCloseModal = () => {
    handleResetSelection()
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} width={1200} onClose={onCloseModal} onRequestClose={onCloseModal}>
      <h5 className="mb-4">Danh sách chiến dịch</h5>
      <CampaignStatsFilter filter={filter} onFilterChange={setFilter} />
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
          <span className="font-medium">Đã chọn {selectedRows.length} chiến dịch</span>
          <Button size="sm" variant="solid" onClick={handleBulkAssign}>
            Gán chiến dịch
          </Button>
          <Button size="sm" onClick={handleResetSelection}>
            Bỏ chọn
          </Button>
        </div>
      )}

      <DataTable
        ref={tableRef}
        selectable
        columns={visibleColumns}
        data={data?.items || []}
        loading={isLoading}
        getRowId={(row) => row.id}
        getRowClassName={(row) => (row.finalUrlId ? 'bg-gray-200' : '')}
        enableRowSelection={(row) => !row.finalUrlId}
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

      <ConfirmDialog {...batchConfirmProps} loading={assignMutation.isPending} />
      <ConfirmDialog {...deleteConfirmProps} loading={removeMutation.isPending} />
    </Dialog>
  )
}
