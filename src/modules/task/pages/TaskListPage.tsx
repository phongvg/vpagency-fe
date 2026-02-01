import EditTaskModal from "@/modules/task/components/EditTaskModal";
import Board from "@/modules/task/components/TaskKanban/Board";
import TaskSplit from "@/modules/task/components/TaskPanel/TaskSplit";
import UpdateProgressTask from "@/modules/task/components/TaskProgress/UpdateProgressTask";
import { AppButton } from "@/shared/components/common/AppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/libs/utils";
import { ClipboardPlus } from "lucide-react";
import { Fragment, useState } from "react";

const TABS = [
  { value: "split", label: "Danh sách" },
  { value: "kanban", label: "Bảng Kanban" },
];

export default function TaskListPage() {
  const [tabValue, setTabValue] = useState<string>(TABS[0].value);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isUpdateProgressOpen, setUpdateProgressOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleOpenEditModal = (taskId?: string) => {
    setSelectedTaskId(taskId ?? null);
    setEditModalOpen(true);
  };

  const handleOpenUpdateProgress = (taskId: string) => {
    setSelectedTaskId(taskId);
    setUpdateProgressOpen(true);
  };

  return (
    <Fragment>
      <Tabs value={tabValue} onValueChange={setTabValue} className='flex flex-col h-full'>
        <div className='flex justify-between items-center'>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AppButton variant='outline' size='sm' onClick={() => handleOpenEditModal()}>
            <ClipboardPlus />
            Tạo mới công việc
          </AppButton>
        </div>

        <TabsContent value={TABS[0].value} className={cn(tabValue === TABS[0].value && "flex-col flex-1 h-0")}>
          <TaskSplit onEdit={handleOpenEditModal} onUpdateProgress={handleOpenUpdateProgress} />
        </TabsContent>

        <TabsContent value={TABS[1].value} className={cn(tabValue === TABS[1].value && "flex flex-col flex-1 h-0")}>
          <Board onEdit={handleOpenEditModal} onUpdateProgress={handleOpenUpdateProgress} />
        </TabsContent>
      </Tabs>

      <EditTaskModal open={isEditModalOpen} onClose={() => setEditModalOpen(false)} taskId={selectedTaskId} />

      <UpdateProgressTask open={isUpdateProgressOpen} onClose={() => setUpdateProgressOpen(false)} taskId={selectedTaskId} />
    </Fragment>
  );
}
