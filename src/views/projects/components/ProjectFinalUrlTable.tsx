import { useCallback, useMemo } from 'react'
import { DataTable } from '@/components/shared'
import { ColumnDef } from '@tanstack/react-table'
import { FinalUrl } from '@/views/projects/types/finalUrl.type'
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi'
import { Button, ConfirmDialog } from '@/components/ui'
import { useFinalUrlStore } from '@/views/projects/store/useFinalUrlStore'
import { useDeleteFinalUrlMutation, useGetFinalUrlsByProjectId } from '@/views/projects/hooks/useFinalUrl'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'

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
        id: 'countries',
        header: 'Quốc gia',
        accessorKey: 'countries',
        cell: (props) => <span>{props.row.original.countries.join(', ')}</span>,
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
    [handleDelete, handleEdit],
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
      <DataTable columns={columns} data={items} loading={isLoading} pagingData={undefined} />
      <ConfirmDialog {...confirmProps} loading={deleteMutation.isPending} />
    </div>
  )
}
