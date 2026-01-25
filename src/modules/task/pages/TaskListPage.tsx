import TaskSplit from "@/modules/task/components/TaskPanel/TaskSplit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const TABS = [
  { value: "split", label: "Danh sách" },
  { value: "kanban", label: "Bảng Kanban" },
];

export default function TaskListPage() {
  return (
    <Tabs defaultValue={TABS[0].value} className='w-full'>
      <TabsList>
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={TABS[0].value}>
        <TaskSplit />
      </TabsContent>

      <TabsContent value={TABS[1].value}>Change your password here.</TabsContent>
    </Tabs>
  );
}
