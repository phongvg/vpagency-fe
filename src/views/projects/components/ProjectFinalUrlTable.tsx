import { DataTable } from '@/components/shared'
import { TableTooltip } from '@/components/shared/TableTooltip'
import { Button, ConfirmDialog } from '@/components/ui'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { toastError, toastSuccess } from '@/utils/toast'
import { useDeleteFinalUrlMutation, useGetFinalUrlsByProjectId } from '@/views/projects/hooks/useFinalUrl'
import { useFinalUrlStore } from '@/views/projects/store/useFinalUrlStore'
import { FinalUrl } from '@/views/projects/types/finalUrl.type'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'
import { HiOutlineDuplicate, HiOutlinePencilAlt, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'

interface ProjectFinalUrlTableProps {
  projectId?: string
  active?: boolean
}

export default function ProjectFinalUrlTable({ projectId, active = false }: ProjectFinalUrlTableProps) {
  const { openDialog } = useFinalUrlStore()
  const enabled = active && Boolean(projectId)
  const { data: finalUrlsResponse, isLoading } = useGetFinalUrlsByProjectId(projectId || '', enabled)
  const deleteMutation = useDeleteFinalUrlMutation()

  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa URL',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  const items = finalUrlsResponse?.items || []

  const handleEdit = useCallback(
    (finalUrl: FinalUrl) => {
      openDialog(finalUrl.id)
    },
    [openDialog],
  )

  const handleDelete = useCallback(
    async (finalUrl: FinalUrl) => {
      const confirmed = await showConfirm({
        message: 'Bạn có chắc chắn muốn xóa URL này?',
      })
      if (confirmed && finalUrl.id) {
        await deleteMutation.mutateAsync({ finalUrlId: finalUrl.id, projectId: finalUrl.projectId })
      }
    },
    [deleteMutation, showConfirm],
  )

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

  const columns: ColumnDef<FinalUrl>[] = useMemo(
    () => [
      {
        id: 'stt',
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
      {
        id: 'name',
        header: 'Tên URL',
        accessorKey: 'name',
        cell: (props) => <span className="font-medium">{props.row.original.name}</span>,
      },
      {
        id: 'finalURL',
        header: 'URL',
        accessorKey: 'finalURL',
        cell: (props) => {
          const row = props.row.original
          return (
            <a
              href={row.finalURL}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-[250px] text-blue-600 hover:underline truncate"
            >
              {row.finalURL}
            </a>
          )
        },
      },
      {
        id: 'countriesTier1',
        header: 'Quốc gia hạng 1',
        accessorKey: 'countriesTier1',
        cell: (props) => {
          const row = props.row.original.countriesTier1 || []
          if (row.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={row.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(row.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        id: 'countriesTier2',
        header: 'Quốc gia hạng 2',
        accessorKey: 'countriesTier2',
        cell: (props) => {
          const row = props.row.original.countriesTier2 || []
          if (row.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={row.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(row.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        id: 'countriesTier3',
        header: 'Quốc gia hạng 3',
        accessorKey: 'countriesTier3',
        cell: (props) => {
          const row = props.row.original.countriesTier3 || []
          if (row.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={row.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(row.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        id: 'excludeCountries',
        header: 'Quốc gia loại trừ',
        accessorKey: 'excludeCountries',
        cell: (props) => {
          const row = props.row.original.excludeCountries || []
          if (row.length === 0) return null

          return (
            <div className="flex items-center gap-2">
              <TableTooltip data={row.map((l) => ({ name: l }))} columns={[{ key: 'name', label: 'Quốc gia' }]} />
              <button type="button" title="Sao chép" onClick={() => handleCopyToClipboard(row.join('\n'))}>
                <HiOutlineDuplicate />
              </button>
            </div>
          )
        },
      },
      {
        header: 'Mục tiêu Ref',
        accessorKey: 'targetRef',
      },
      {
        header: 'Mục tiêu chi phí Ref',
        accessorKey: 'targetCostPerRef',
      },
      {
        header: 'Mục tiêu FTD',
        accessorKey: 'targetFtd',
      },
      {
        header: 'Mục tiêu chi phí FTD',
        accessorKey: 'targetCostPerFtd',
      },
      {
        header: 'Volume key/ngày',
        accessorKey: 'targetDailyKeyVolume',
      },
      {
        header: 'Mục tiêu CPC',
        accessorKey: 'targetCpc',
      },
      {
        header: 'Ngân sách',
        accessorKey: 'budget',
      },
      {
        header: 'Giá thầu đề xuất',
        accessorKey: 'suggestedBid',
      },
      {
        id: 'actions',
        header: '',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex justify-end items-center gap-4">
              <button type="button" onClick={() => handleEdit(row)}>
                <HiOutlinePencilAlt size={20} />
              </button>
              <button type="button" onClick={() => handleDelete(row)}>
                <HiOutlineTrash size={20} />
              </button>
            </div>
          )
        },
      },
    ],
    [handleDelete, handleEdit, handleCopyToClipboard],
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h6 className="font-semibold text-base">Danh sách URL của dự án</h6>
        <Button
          type="button"
          size="sm"
          variant="solid"
          icon={<HiOutlinePlus />}
          disabled={!enabled}
          title={!enabled ? 'Vui lòng tạo và lưu dự án trước' : ''}
          onClick={() => openDialog(null)}
        >
          Thêm URL
        </Button>
      </div>
      <DataTable columns={columns} data={items} loading={isLoading} maxHeight={500} />
      <ConfirmDialog {...confirmProps} loading={deleteMutation.isPending} />
    </div>
  )
}
