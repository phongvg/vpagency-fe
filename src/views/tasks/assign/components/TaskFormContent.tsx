import { useCreateTask, useUpdateTask } from '@/views/tasks/assign/hooks/useTaskQueries'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { toastError, toastSuccess } from '@/utils/toast'
import TaskForm from './TaskForm'

export default function TaskFormContent() {
  const { dialogView, selectedTask, closeDialog } = useBoardStore()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()

  const isEdit = dialogView === 'EDIT'
  const loading = createTask.isPending || updateTask.isPending

  const handleSubmit = async (values: any) => {
    try {
      if (isEdit && selectedTask) {
        await updateTask.mutateAsync({
          taskId: selectedTask.id,
          data: values,
        })
        toastSuccess('Cập nhật công việc thành công')
      } else {
        await createTask.mutateAsync(values)
        toastSuccess('Tạo công việc thành công')
      }
      closeDialog()
    } catch (error: any) {
      const message =
        error?.response?.data?.message || (isEdit ? 'Cập nhật công việc thất bại' : 'Tạo công việc thất bại')
      toastError(message)
    }
  }

  const handleCancel = async () => {
    closeDialog()
  }

  return (
    <>
      <TaskForm task={selectedTask} isEdit={isEdit} onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
    </>
  )
}
