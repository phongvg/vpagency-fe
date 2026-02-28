import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import type { Task } from "@/modules/task/types/task.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { FileText } from "lucide-react";

interface TaskResearchCardProps {
  task: Task;
}

export default function TaskResearchCard({ task }: TaskResearchCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin nghiên cứu</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <InfoRow label='Nội dung nghiên cứu' value={task.researchContent} icon={<FileText className='w-4 h-4' />} />
      </CardContent>
    </Card>
  );
}
