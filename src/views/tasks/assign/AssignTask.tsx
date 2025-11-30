import { AdaptableCard } from '@/components/shared'
import { Dialog } from '@/components/ui'
import { TaskViewType } from '@/enums/taskView.enum'
import Board from '@/views/tasks/assign/components/Board'
import BoardHeader from '@/views/tasks/assign/components/BoardHeader'
import TaskDetailContent from '@/views/tasks/assign/components/TaskDetailContent'
import TaskFormContent from '@/views/tasks/assign/components/TaskFormContent'
import TaskSplitView from '@/views/tasks/assign/components/TaskSplitView'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { Suspense } from 'react'

export default function AssignTask() {
  const { dialogOpen, dialogView, activeView, closeDialog, setActiveView } = useBoardStore()

  const handleViewChange = (view: TaskViewType) => {
    setActiveView(view)
  }

  const renderContent = () => {
    switch (activeView) {
      case TaskViewType.KANBAN:
        return <Board key="kanban" />
      case TaskViewType.SPLIT:
        return <TaskSplitView key="split" />
      default:
        return null
    }
  }

  return (
    <AdaptableCard className="h-full" bodyClass="h-full flex flex-col">
      <BoardHeader activeView={activeView} onViewChange={handleViewChange} />
      <div className="flex-1 min-h-0">{renderContent()}</div>

      <Dialog
        isOpen={dialogOpen}
        width={dialogView === 'VIEW' ? 800 : 900}
        closable={false}
        onClose={closeDialog}
        onRequestClose={closeDialog}
      >
        <Suspense fallback={<></>}>
          {dialogView === 'VIEW' && <TaskDetailContent />}
          {(dialogView === 'CREATE' || dialogView === 'EDIT') && <TaskFormContent />}
        </Suspense>
      </Dialog>

      {/* <Dialog isOpen={dialogOpen} width={800} closable={false} onClose={closeDialog} onRequestClose={closeDialog}>
        <Suspense fallback={<></>}>
          <TaskDetailContent />
        </Suspense>
      </Dialog> */}
    </AdaptableCard>
  )
}
