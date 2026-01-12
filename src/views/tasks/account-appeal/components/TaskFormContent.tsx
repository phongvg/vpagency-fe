import { useAccountAppealStore } from '../store/useAccountAppealStore'
import { CreateAccountAppealRequest } from '../types/accountAppeal.type'
import TaskForm from './TaskForm'

export default function TaskFormContent() {
  const { dialogView, selectedTask, closeDialog } = useAccountAppealStore()

  const isEdit = dialogView === 'EDIT'
  const loading = false // TODO: Add create/update mutations

  const handleSubmit = async (values: CreateAccountAppealRequest) => {
    // TODO: Call API to create/update
    console.log('Submit:', values)
    closeDialog()
  }

  const handleCancel = () => {
    closeDialog()
  }

  return (
    <TaskForm task={selectedTask} isEdit={isEdit} loading={loading} onSubmit={handleSubmit} onCancel={handleCancel} />
  )
}
