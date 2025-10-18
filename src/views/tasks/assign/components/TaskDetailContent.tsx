import { ConfirmDialog } from '@/components/ui'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useDeleteTask } from '@/views/tasks/assign/hooks/useTaskQueries'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { toastError, toastSuccess } from '@/utils/toast'
import TaskDetailView from './TaskDetailView'

export default function TaskDetailContent() {
  const { selectedTask, setDialogView, closeDialog } = useBoardStore()
  const deleteTask = useDeleteTask()
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Xác nhận xóa công việc',
    type: 'danger',
    confirmText: 'Xóa',
    cancelText: 'Hủy',
  })

  if (!selectedTask) {
    return null
  }

  const handleEdit = () => {
    setDialogView('EDIT')
  }

  const handleDeleteClick = async () => {
    const confirmed = await showConfirm({
      message: `Bạn có chắc chắn muốn xóa công việc "${selectedTask?.name}"? Hành động này không thể hoàn tác.`,
    })

    if (confirmed) {
      try {
        await deleteTask.mutateAsync(selectedTask.id)
        toastSuccess('Xóa công việc thành công')
        closeDialog()
      } catch (error) {
        toastError('Xóa công việc thất bại')
      }
    }
  }

  return (
    <>
      <TaskDetailView task={selectedTask} onEdit={handleEdit} onDelete={handleDeleteClick} />
      <ConfirmDialog {...confirmProps} loading={deleteTask.isPending} />
    </>
  )
}
