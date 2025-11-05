import { ConfirmDialog } from '@/components/ui'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useDeleteTask, useGetTaskDetail } from '@/views/tasks/assign/hooks/useTaskQueries'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import TaskDetailView from './TaskDetailView'
import { Loading } from '@/components/shared'

export default function TaskDetailContent() {
  const { taskId, setDialogView, closeDialog } = useBoardStore()
  const { data: taskDetail, isLoading } = useGetTaskDetail(taskId)
  const deleteTask = useDeleteTask()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa công việc',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  if (isLoading) {
    return <Loading loading={true} />
  }

  if (!taskDetail) {
    return null
  }

  const handleEdit = () => {
    setDialogView('EDIT')
  }

  const handleDeleteClick = async () => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa công việc "${taskDetail?.name}"? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      await deleteTask.mutateAsync(taskDetail.id)
      closeDialog()
    }
  }

  return (
    <>
      <TaskDetailView task={taskDetail} onEdit={handleEdit} onDelete={handleDeleteClick} />
      <ConfirmDialog {...confirmProps} loading={deleteTask.isPending} />
    </>
  )
}
