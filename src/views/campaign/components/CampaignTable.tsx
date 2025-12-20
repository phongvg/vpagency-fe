import { DataTable } from '@/components/shared'
import BadgeStatus from '@/components/shared/BadgeStatus'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { Button, Checkbox, ConfirmDialog, Dropdown } from '@/components/ui'
import { addDash } from '@/helpers/addDash'
import { convertNumberToPercent } from '@/helpers/convertNumberToPercent'
import { fixedNumber } from '@/helpers/fixedNumber'
import { formatDate } from '@/helpers/formatDate'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { toastError, toastSuccess } from '@/utils/toast'
import { COLUMN_CONFIG } from '@/views/campaign/constants/campaignColumnConfig.constant'
import { useDeleteCampaignMutation, useGetCampaignsQuery } from '@/views/campaign/hooks/useCampaign'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { Campaign } from '@/views/campaign/types/campaign.type'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { HiOutlineDuplicate, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineViewList } from 'react-icons/hi'

export default function CampaignTable() {
  const { filter, setFilter, openDialog } = useCampaignStore()

  const { data: getCampaignsResponse, isLoading } = useGetCampaignsQuery()
  const deleteCampaignMutation = useDeleteCampaignMutation()

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    COLUMN_CONFIG.forEach((col) => {
      initial[col.id] = col.visible
    })
    return initial
  })

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa chiến dịch',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const metaTableData = useMemo(() => getCampaignsResponse?.meta, [getCampaignsResponse])

  const handleEdit = useCallback(
    (campaign: Campaign) => {
      openDialog(campaign.id ?? null)
    },
    [openDialog],
  )

  const handleDelete = useCallback(
    async (campaign: Campaign) => {
      const confirmed = await showConfirm({
        message: 'Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác.',
      })

      if (confirmed) {
        await deleteCampaignMutation.mutateAsync(campaign.id ?? '')
      }
    },
    [deleteCampaignMutation, showConfirm],
  )

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

  const isAllColumnsVisible = useMemo(() => {
    return COLUMN_CONFIG.every((col) => col.required || columnVisibility[col.id])
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
          <div className="flex items-center gap-2 whitespace-nowrap">
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
        id: 'gmail',
        header: 'Gmail',
        accessorKey: 'gmail',
      },
      {
        id: 'statusCampaign',
        header: 'Trạng thái chiến dịch',
        accessorKey: 'status',
        cell: (props) => {
          if (!props.row.original.status) return null

          return <BadgeStatus content={props.row.original.status} />
        },
      },
      {
        id: 'mcc',
        header: 'MCC',
        accessorKey: 'mcc',
        cell: (props) => <span className="whitespace-nowrap">{addDash(props.row.original.mcc)}</span>,
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
    [filter, handleDelete, handleEdit, handleCopyToClipboard],
  )

  const visibleColumns = useMemo(() => {
    return allColumns.filter((col) => columnVisibility[col.id as string])
  }, [allColumns, columnVisibility])

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
        columns={visibleColumns}
        data={getCampaignsResponse?.items || []}
        loading={isLoading}
        pagingData={{
          total: metaTableData?.total as number,
          pageIndex: metaTableData?.page as number,
          pageSize: metaTableData?.limit as number,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />

      <ConfirmDialog {...confirmProps} loading={deleteCampaignMutation.isPending} />
    </>
  )
}
