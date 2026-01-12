import { useResearchStore } from '../store/useResearchStore'
import { CreateResearchRequest } from '../types/research.type'
import TaskForm from './TaskForm'

export default function TaskFormContent() {
  const { dialogView, selectedTask, closeDialog } = useResearchStore()

  const isEdit = dialogView === 'EDIT'
  const loading = false // TODO: Add create/update mutations

  const handleSubmit = async (values: CreateResearchRequest) => {
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
