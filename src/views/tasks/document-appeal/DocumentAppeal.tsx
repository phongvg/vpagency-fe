import { AdaptableCard } from '@/components/shared'
import { Button, Dialog } from '@/components/ui'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { isAdminOrManager } from '@/utils/checkRole'
import { Suspense } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import TaskFilters from './components/TaskFilters'
import TaskFormContent from './components/TaskFormContent'
import TaskSplitView from './components/TaskSplitView'
import { useDocumentAppealStore } from './store/useDocumentAppealStore'

export default function DocumentAppeal() {
  const { dialogOpen, dialogView, closeDialog, openDialog, setSelectedTask } = useDocumentAppealStore()
  const { user } = useAuthStore()

  const handleCreateTask = () => {
    setSelectedTask(null)
    openDialog('CREATE')
  }

  return (
    <AdaptableCard className="h-full" bodyClass="h-full flex flex-col">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        {isAdminOrManager(user?.roles) && (
          <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={handleCreateTask}>
            Thêm mới
          </Button>
        )}
      </div>

      <div className="mt-4">
        <TaskFilters />
      </div>

      <div className="flex-1 min-h-0 mt-4">
        <TaskSplitView />
      </div>

      <Dialog isOpen={dialogOpen} width={900} closable={false} onClose={closeDialog} onRequestClose={closeDialog}>
        <Suspense fallback={<></>}>
          {(dialogView === 'CREATE' || dialogView === 'EDIT') && <TaskFormContent />}
        </Suspense>
      </Dialog>
    </AdaptableCard>
  )
}
