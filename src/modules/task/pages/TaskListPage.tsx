import EditTaskModal from "@/modules/task/components/EditTaskModal";
import TaskSplit from "@/modules/task/components/TaskPanel/TaskSplit";
import { AppButton } from "@/shared/components/common/AppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Icon } from "@iconify/react";
import { useState } from "react";

const TABS = [
  { value: "split", label: "Danh sách" },
  { value: "kanban", label: "Bảng Kanban" },
];

export default function TaskListPage() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleOpenEditModal = (taskId?: string) => {
    setSelectedTaskId(taskId ?? null);
    setEditModalOpen(true);
  };

  return (
    <div className='h-full w-full flex flex-col'>
      <Tabs defaultValue={TABS[0].value} className='flex flex-col h-full'>
        <div className='flex items-center justify-between'>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AppButton variant='outline' size='sm' onClick={() => handleOpenEditModal()}>
            <Icon icon='uil:plus-circle' />
            Tạo mới công việc
          </AppButton>
        </div>

        <TabsContent value={TABS[0].value} className='flex-1 h-0 flex flex-col'>
          <TaskSplit onEdit={handleOpenEditModal} />
        </TabsContent>

        <TabsContent value={TABS[1].value}>Change your password here.</TabsContent>
      </Tabs>

      <EditTaskModal open={isEditModalOpen} onClose={() => setEditModalOpen(false)} taskId={selectedTaskId} />
    </div>
  );
}
