import { DataTable } from '@/components/shared'
import { Badge, ConfirmDialog, Tooltip, Button, Checkbox, Dropdown } from '@/components/ui'
import { addDash } from '@/helpers/addDash'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useDeleteCampaignMutation, useGetCampaignsQuery } from '@/views/campaign/hooks/useCampaign'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { Campaign } from '@/views/campaign/types/campaign.type'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineViewList } from 'react-icons/hi'

// Column configuration with default visibility
const COLUMN_CONFIG = [
  { id: 'stt', label: 'STT', visible: true, required: true },
  { id: 'datePull', label: 'Ngày kéo', visible: true, required: false },
  { id: 'dateData', label: 'Ngày dữ liệu', visible: true, required: false },
  { id: 'uid', label: 'UID', visible: true, required: false },
  { id: 'mcc', label: 'MCC', visible: true, required: false },
  { id: 'campaignId', label: 'ID chiến dịch', visible: true, required: false },
  { id: 'campaignName', label: 'Tên chiến dịch', visible: true, required: false },
  { id: 'finalUrl', label: 'URL cuối cùng', visible: false, required: false },
  { id: 'keyword', label: 'Từ khóa', visible: false, required: false },
  { id: 'match', label: 'Phù hợp', visible: false, required: false },
  { id: 'searchTerm', label: 'Thuật ngữ tìm kiếm', visible: false, required: false },
  { id: 'cpcSearchTerm', label: 'CPC tìm kiếm', visible: false, required: false },
  { id: 'costSearchTerm', label: 'Chi phí của từng CPC', visible: false, required: false },
  { id: 'statusCampaign', label: 'Trạng thái chiến dịch', visible: true, required: false },
  { id: 'avgCpc', label: 'CPC trung bình', visible: false, required: false },
  { id: 'micros', label: 'Thầu chung', visible: false, required: false },
  { id: 'click', label: 'Click', visible: false, required: false },
  { id: 'ctr', label: 'CTR', visible: false, required: false },
  { id: 'cpm', label: 'CPM', visible: false, required: false },
  { id: 'cost', label: 'Ngân sách chi tiêu', visible: false, required: false },
  { id: 'locationTarget', label: 'Mục tiêu quốc gia', visible: false, required: false },
  { id: 'spendingCountry', label: 'Quốc gia cắn tiền', visible: false, required: false },
  { id: 'cpcCountry', label: 'CPC quốc gia', visible: false, required: false },
  { id: 'ctrCountry', label: 'CTR quốc gia', visible: false, required: false },
  { id: 'clickCountry', label: 'Click quốc gia', visible: false, required: false },
  { id: 'costCountry', label: 'Tổng chi tiêu quốc gia', visible: false, required: false },
  { id: 'actions', label: 'Hành động', visible: true, required: true },
]

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

  const renderBadgeList = useCallback((items: (string | number)[], maxVisible = 3) => {
    if (!items || items.length === 0) return null

    const visibleItems = items.slice(0, maxVisible)
    const remainingCount = items.length - maxVisible

    return (
      <div className="flex flex-wrap gap-2 py-2">
        {visibleItems.map((item, i) => (
          <Badge
            key={`${item}-${i}`}
            className="flex justify-center items-center bg-transparent border text-slate-900"
            content={String(item)}
          />
        ))}
        {remainingCount > 0 && (
          <Tooltip title={items.slice(maxVisible).map(String).join(', ')}>
            <Badge
              content={`+${remainingCount} items`}
              className="flex justify-center items-center bg-transparent border text-slate-900 cursor-help"
            />
          </Tooltip>
        )}
      </div>
    )
  }, [])

  const handleEdit = useCallback(
    (campaign: Campaign) => {
      openDialog(campaign.id ?? null)
    },
    [openDialog],
  )

  const handleDelete = useCallback(
    async (campaign: Campaign) => {
      const confirmed = await showConfirm({
        message: `Bạn có chắc chắn muốn xóa dự án "${campaign.campaignName}"? Hành động này không thể hoàn tác.`,
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
        id: 'datePull',
        header: 'Ngày kéo',
        accessorKey: 'datePull',
        cell: (props) => <span>{props.row.original.datePull}</span>,
      },
      {
        id: 'dateData',
        header: 'Ngày dữ liệu',
        accessorKey: 'dateData',
        cell: (props) => <span>{props.row.original.dateData}</span>,
      },
      {
        id: 'uid',
        header: 'UID',
        accessorKey: 'uid',
        cell: (props) => <span>{addDash(props.row.original.uid)}</span>,
      },
      {
        id: 'mcc',
        header: 'MCC',
        accessorKey: 'mcc',
        cell: (props) => <span>{addDash(props.row.original.mcc)}</span>,
      },
      {
        id: 'campaignId',
        header: 'ID chiến dịch',
        accessorKey: 'campaignId',
        cell: (props) => <span>{addDash(props.row.original.campaignId)}</span>,
      },
      {
        id: 'campaignName',
        header: 'Tên chiến dịch',
        accessorKey: 'campaignName',
        cell: (props) => <span>{props.row.original.campaignName}</span>,
      },
      {
        id: 'finalUrl',
        header: 'URL cuối cùng',
        accessorKey: 'finalUrl',
        cell: (props) => (
          <a
            href={props.row.original.finalUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate"
          >
            {props.row.original.finalUrl}
          </a>
        ),
      },
      {
        id: 'keyword',
        header: 'Từ khóa',
        accessorKey: 'keyword',
        cell: (props) => renderBadgeList(props.row.original.keyword),
      },
      {
        id: 'match',
        header: 'Phù hợp',
        accessorKey: 'match',
        cell: (props) => renderBadgeList(props.row.original.match),
      },
      {
        id: 'searchTerm',
        header: 'Thuật ngữ tìm kiếm',
        accessorKey: 'searchTerm',
        cell: (props) => renderBadgeList(props.row.original.searchTerm),
      },
      {
        id: 'cpcSearchTerm',
        header: 'CPC tìm kiếm',
        accessorKey: 'cpcSearchTerm',
        cell: (props) => renderBadgeList(props.row.original.cpcSearchTerm),
      },
      {
        id: 'costSearchTerm',
        header: 'Chi phí của từng CPC',
        accessorKey: 'costSearchTerm',
        cell: (props) => renderBadgeList(props.row.original.costSearchTerm),
      },
      {
        id: 'statusCampaign',
        header: 'Trạng thái chiến dịch',
        accessorKey: 'statusCampaign',
        cell: (props) => <span>{props.row.original.statusCampaign}</span>,
      },
      {
        id: 'avgCpc',
        header: 'CPC trung bình',
        accessorKey: 'avgCpc',
        cell: (props) => <span>{props.row.original.avgCpc}</span>,
      },
      {
        id: 'micros',
        header: 'Thầu chung',
        accessorKey: 'micros',
        cell: (props) => <span>{props.row.original.micros}</span>,
      },
      {
        id: 'click',
        header: 'Click',
        accessorKey: 'click',
        cell: (props) => <span>{props.row.original.click}</span>,
      },
      {
        id: 'ctr',
        header: 'CTR',
        accessorKey: 'ctr',
        cell: (props) => <span>{props.row.original.ctr}</span>,
      },
      {
        id: 'cpm',
        header: 'CPM',
        accessorKey: 'cpm',
        cell: (props) => <span>{props.row.original.cpm}</span>,
      },
      {
        id: 'cost',
        header: 'Ngân sách chi tiêu',
        accessorKey: 'cost',
        cell: (props) => <span>{props.row.original.cost}</span>,
      },
      {
        id: 'locationTarget',
        header: 'Mục tiêu quốc gia',
        accessorKey: 'locationTarget',
        cell: (props) => renderBadgeList(props.row.original.locationTarget),
      },
      {
        id: 'spendingCountry',
        header: 'Quốc gia cắn tiền',
        accessorKey: 'spendingCountry',
        cell: (props) => <span>{props.row.original.spendingCountry}</span>,
      },
      {
        id: 'cpcCountry',
        header: 'CPC quốc gia',
        accessorKey: 'cpcCountry',
        cell: (props) => <span>{props.row.original.cpcCountry}</span>,
      },
      {
        id: 'ctrCountry',
        header: 'CTR quốc gia',
        accessorKey: 'ctrCountry',
        cell: (props) => <span>{props.row.original.ctrCountry}</span>,
      },
      {
        id: 'clickCountry',
        header: 'Click quốc gia',
        accessorKey: 'clickCountry',
        cell: (props) => <span>{props.row.original.clickCountry}</span>,
      },
      {
        id: 'costCountry',
        header: 'Tổng chi tiêu quốc gia',
        accessorKey: 'costCountry',
        cell: (props) => <span>{props.row.original.costCountry}</span>,
      },
      {
        id: 'actions',
        header: '',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center gap-4">
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
    [filter, handleDelete, handleEdit, renderBadgeList],
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
