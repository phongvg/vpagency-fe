import { useTopProjectByProfit } from "@/modules/dashboard/hooks/useTopProjectByProfit";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { cn } from "@/shared/libs/utils";
import { formatDollarAmount } from "@/shared/utils/common.util";
import { Fragment } from "react";

const rankColor: Record<number, string> = {
  0: "bg-primary",
  1: "bg-gray-400",
  2: "bg-amber-600",
};

export default function ProjectRankingsCard() {
  const { data: topProjects } = useTopProjectByProfit();

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>BXH dự án theo lợi nhuận</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='space-y-3'>
          {topProjects?.map((project, index) => (
            <Fragment key={project.projectId}>
              <div className='flex items-center gap-2'>
                <span className={cn("flex justify-center items-center rounded-full w-6 h-6 font-semibold", rankColor[index])}>{index + 1}</span>
                <span className='flex-1 font-medium truncate'>{project.projectName}</span>
                <span className='ml-auto font-semibold text-green-500'>{formatDollarAmount(project.profit)}</span>
              </div>

              {/* <Separator className='my-2' /> */}
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
