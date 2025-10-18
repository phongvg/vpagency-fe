import { useState } from 'react'
import { ConfirmDialog } from '@/components/ui'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useCreateTask, useUpdateTask } from '@/views/tasks/assign/hooks/useTaskQueries'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { toastError, toastSuccess } from '@/utils/toast'
import TaskForm from './TaskForm'

interface TaskFormContentProps {
  inSplitView?: boolean
}

export default function TaskFormContent({ inSplitView = false }: TaskFormContentProps) {
  const { dialogView, selectedTask, closeDialog, setDialogView } = useBoardStore()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const [formChanged, setFormChanged] = useState(false)
  const { showConfirm, confirmProps } = useConfirmDialog({
    title: 'Hủy thay đổi',
    message: 'Bạn có những thay đổi chưa lưu. Bạn có chắc chắn muốn hủy?',
    type: 'warning',
    confirmText: 'Hủy thay đổi',
    cancelText: 'Tiếp tục chỉnh sửa',
  })

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
      if (inSplitView) {
        setDialogView('VIEW')
      } else {
        closeDialog()
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || (isEdit ? 'Cập nhật công việc thất bại' : 'Tạo công việc thất bại')
      toastError(message)
    }
  }

  const handleCancel = async () => {
    closeDialog()
  }

  const handleFormChange = (changed: boolean) => {
    setFormChanged(changed)
  }

  return (
    <>
      <TaskForm
        task={selectedTask}
        isEdit={isEdit}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        onFormChange={handleFormChange}
      />
      <ConfirmDialog {...confirmProps} />
    </>
  )
}
