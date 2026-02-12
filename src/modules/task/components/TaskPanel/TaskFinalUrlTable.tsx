import type { FinalUrl } from "@/modules/finalUrl/types/finalUrl.type";
import { finalUrlColumnConfig } from "@/modules/task/configs/final-url-column.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";
import { copyToClipboard } from "@/shared/utils/common.util";

interface TaskFinalUrlTableProps {
  finalUrls: FinalUrl[];
}

export default function TaskFinalUrlTable({ finalUrls }: TaskFinalUrlTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách URL cuối</CardTitle>
      </CardHeader>

      <CardContent>
        <AppTable data={finalUrls} columns={finalUrlColumnConfig(copyToClipboard)} />
      </CardContent>
    </Card>
  );
}
