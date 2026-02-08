import type { Project } from "@/modules/project/types/project.type";
import { appealProjectColumnConfig } from "@/modules/task/configs/appeal-project-column.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";

interface TaskAppealProjectTableProps {
  projects: Project[];
}

export default function TaskAppealProjectTable({ projects }: TaskAppealProjectTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách Dự án kháng</CardTitle>
      </CardHeader>

      <CardContent className='normal-case'>
        <AppTable data={projects} columns={appealProjectColumnConfig} page={1} pageCount={1} pageSize={projects.length} />
      </CardContent>
    </Card>
  );
}
