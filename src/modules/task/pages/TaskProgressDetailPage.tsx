import EmptyTaskProgressDetail from "@/modules/task/components/EmptyTaskProgressDetail";
import InfoRow from "@/modules/task/components/TaskPanel/InfoRow";
import { campaignStatsColumnConfig } from "@/modules/task/configs/campaign-stats-column.config";
import { userStatsColumns } from "@/modules/task/configs/user-stats-column.config";
import { useTaskProgressDetail } from "@/modules/task/hooks/useTaskProgressDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppLoading } from "@/shared/components/common/AppLoading";
import { AppTable } from "@/shared/components/common/AppTable";
import { useQueryParam } from "@/shared/hooks/useQueryParam";

export default function TaskProgressDetailPage() {
  const queryId = useQueryParam("id");
  const taskId = queryId ?? null;

  const { data: taskProgressDetail, isLoading } = useTaskProgressDetail(taskId);

  if (isLoading) return <AppLoading loading={isLoading} />;

  if (taskProgressDetail?.finalUrls.length === 0) {
    return <EmptyTaskProgressDetail />;
  }

  return (
    <div className='space-y-4'>
      {taskProgressDetail?.finalUrls.map((finalUrl) => (
        <div key={finalUrl.id} className='gap-4 grid grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin URL</CardTitle>
            </CardHeader>

            <CardContent className='space-y-2'>
              <InfoRow label='Tên URL' value={finalUrl.name} />
              <InfoRow label='URL' value={finalUrl.finalURL} />
              <InfoRow label='Mục tiêu Ref' value={finalUrl.targetRef} />
              <InfoRow label='Mục tiêu Ftd' value={finalUrl.targetFtd} />
              <InfoRow label='Mục tiêu chi phí Ref' value={finalUrl.targetCostPerRef} />
              <InfoRow label='Mục tiêu chi phí Ftd' value={finalUrl.targetCostPerFtd} />
              <InfoRow label='Mục tiêu CPC' value={finalUrl.targetCpc} />
            </CardContent>
          </Card>

          <div className='col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle>Thống kê tài khoản</CardTitle>
              </CardHeader>

              <CardContent>
                <AppTable columns={userStatsColumns} data={finalUrl.userStats} pageCount={1} page={1} pageSize={finalUrl.userStats.length} />
              </CardContent>
            </Card>
          </div>

          <div className='col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Thống kê chiến dịch</CardTitle>
              </CardHeader>

              <CardContent>
                <AppTable
                  columns={campaignStatsColumnConfig}
                  data={finalUrl.campaignStats}
                  pageCount={1}
                  page={1}
                  pageSize={finalUrl.campaignStats.length}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
