import type { FinalURLGroup } from "@/modules/finalUrl/types/finalUrl.type";
import { taskProgressUrlColumnConfig } from "@/modules/task/configs/task-progress-url-column.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";

interface FinalUrlsTableProps {
  finalUrls: FinalURLGroup[];
  onOpenCampaignStats: (finalUrlId: string) => void;
}

export default function FinalUrlsTable({ finalUrls, onOpenCampaignStats }: FinalUrlsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách URL cuối cùng</CardTitle>
      </CardHeader>

      <CardContent>
        <AppTable columns={taskProgressUrlColumnConfig(onOpenCampaignStats)} data={finalUrls} />
      </CardContent>
    </Card>
  );
}
