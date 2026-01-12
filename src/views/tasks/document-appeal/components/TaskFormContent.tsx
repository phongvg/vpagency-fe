import { useDocumentAppealStore } from '../store/useDocumentAppealStore'
import { CreateDocumentAppealRequest } from '../types/documentAppeal.type'
import TaskForm from './TaskForm'

export default function TaskFormContent() {
  const { dialogView, selectedTask, closeDialog } = useDocumentAppealStore()

  const isEdit = dialogView === 'EDIT'
  const loading = false // TODO: Add create/update mutations

  const handleSubmit = async (values: CreateDocumentAppealRequest) => {
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
