import { useCreateTask, useUpdateTask } from '@/views/tasks/assign/hooks/useTask'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import TaskForm from './TaskForm'
import { UpdateTaskRequest } from '@/views/tasks/assign/types/task.type'

export default function TaskFormContent() {
  const { dialogView, selectedTask, closeDialog } = useBoardStore()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()

  const isEdit = dialogView === 'EDIT'
  const loading = createTask.isPending || updateTask.isPending

  const handleSubmit = async (values: UpdateTaskRequest) => {
    if (isEdit && selectedTask) {
      await updateTask.mutateAsync({
        taskId: selectedTask.id,
        data: values,
      })
    } else {
      await createTask.mutateAsync(values)
    }

    closeDialog()
  }

  const handleCancel = async () => {
    closeDialog()
  }

  return (
    <TaskForm task={selectedTask} isEdit={isEdit} loading={loading} onSubmit={handleSubmit} onCancel={handleCancel} />
  )
}
