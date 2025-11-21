import { DataTable } from '@/components/shared'
import { Badge, ConfirmDialog, Tooltip, Button, Checkbox, Dropdown } from '@/components/ui'
import { addDash } from '@/helpers/addDash'
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
        id: 'externalId',
        header: 'ID chiến dịch',
        accessorKey: 'externalId',
        cell: (props) => (
          <div className="flex items-center gap-2">
            {addDash(props.row.original.externalId)}
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
        id: 'uid',
        header: 'UID',
        accessorKey: 'uid',
        cell: (props) => (
          <div className="flex items-center gap-2">
            {addDash(props.row.original.uid)}
            <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(props.row.original.uid || '')}>
              <HiOutlineDuplicate />
            </button>
          </div>
        ),
      },
      {
        id: 'mcc',
        header: 'MCC',
        accessorKey: 'mcc',
        cell: (props) => <span>{addDash(props.row.original.mcc)}</span>,
      },
      {
        id: 'finalUrl',
        header: 'URL',
        accessorKey: 'finalUrl',
        cell: (props) => (
          <a
            href={props.row.original.finalUrl?.finalURL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-xs text-blue-600 hover:underline truncate"
            title={props.row.original.finalUrl?.finalURL}
          >
            {props.row.original.finalUrl?.finalURL}
          </a>
        ),
      },
      {
        id: 'statusCampaign',
        header: 'Trạng thái chiến dịch',
        accessorKey: 'status',
        cell: (props) => <span>{props.row.original.status}</span>,
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
        id: 'keywords',
        header: 'Từ khóa',
        cell: (props) => {
          const keywords = props.row.original.keywords || []
          if (keywords.length === 0) return ''

          return (
            <Tooltip title={keywords.map((k) => `${k.keyword} (${k.match})`).join(', ')}>
              <Badge content={`${keywords.length} từ khóa`} className="bg-blue-50 text-blue-700 cursor-help" />
            </Tooltip>
          )
        },
      },
      {
        id: 'targetLocations',
        header: 'Quốc gia mục tiêu',
        accessorKey: 'targetLocations',
        cell: (props) => {
          const locations = props.row.original.targetLocations || []
          if (locations.length === 0) return ''

          return (
            <Tooltip title={locations.join(', ')}>
              <Badge content={`${locations.length} quốc gia`} className="bg-blue-50 text-blue-700 cursor-help" />
            </Tooltip>
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
            <Tooltip
              scrollable
              trigger="click"
              maxHeight={700}
              placement="left"
              title={
                <div className="text-xs">
                  <table className="w-full">
                    <thead>
                      <tr className="border-gray-600 border-b">
                        <th className="px-1 py-1 text-left whitespace-nowrap">Thuật ngữ</th>
                        <th className="px-2 py-1 text-left whitespace-nowrap">CPC</th>
                        <th className="px-2 py-1 text-left whitespace-nowrap">Đã tiêu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {terms.map((term, i) => (
                        <tr key={i} className="border-gray-700 last:border-0 border-b">
                          <td className="px-1 py-1 text-left">{term.term}</td>
                          <td className="px-2 py-1 text-left">{term.cpc.toFixed(2)}</td>
                          <td className="px-2 py-1 text-left">{term.spent.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            >
              <div className="cursor-help" title="Click để xem chi tiết">
                <div className="flex items-center gap-1">
                  <Badge content={`+${terms.length - 1}`} className="bg-blue-50 text-blue-700 text-xs" />
                </div>
              </div>
            </Tooltip>
          )
        },
      },
      {
        id: 'locationStats',
        header: 'Thống kê quốc gia',
        accessorKey: 'locationStats',
        cell: (props) => {
          const stats = props.row.original.locationStats || []
          if (stats.length === 0) return ''

          return (
            <Tooltip
              scrollable
              trigger="click"
              maxHeight={700}
              placement="left"
              title={
                <div className="text-xs">
                  <table className="w-full">
                    <thead>
                      <tr className="border-gray-600 border-b">
                        <th className="px-1 py-1 text-left whitespace-nowrap">Quốc gia</th>
                        <th className="px-1 py-1 text-left whitespace-nowrap">Click</th>
                        <th className="px-1 py-1 text-left whitespace-nowrap">CTR</th>
                        <th className="px-1 py-1 text-left whitespace-nowrap">CPC</th>
                        <th className="px-1 py-1 text-left whitespace-nowrap">Đã tiêu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.map((stat, i) => (
                        <tr key={i} className="border-gray-700 last:border-0 border-b">
                          <td className="px-1 py-1 text-left">{stat.location}</td>
                          <td className="px-1 py-1 text-left">{stat.clicks}</td>
                          <td className="px-1 py-1 text-left">{stat.ctr}</td>
                          <td className="px-1 py-1 text-left">{stat.cpc.toFixed(2)}</td>
                          <td className="px-1 py-1 text-left">{stat.spent.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            >
              <div className="cursor-help">
                <div className="flex items-center gap-1">
                  <Badge content={`+${stats.length - 1}`} className="bg-blue-50 text-blue-700 text-xs" />
                </div>
              </div>
            </Tooltip>
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
