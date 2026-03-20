import { useTopFinalUrlsByCost } from "@/modules/dashboard/hooks/useTopFinalUrlsByCost";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { cn } from "@/shared/libs/utils";
import { formatDollarAmount } from "@/shared/utils/common.util";
import { Fragment } from "react";

const rankColor: Record<number, string> = {
  0: "bg-primary",
  1: "bg-gray-400",
  2: "bg-amber-600",
};

export default function FinalUrlRankingsCard() {
  const { data: topFinalUrls } = useTopFinalUrlsByCost();

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>BXH URL theo tổng chi tiêu</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='space-y-3'>
          {topFinalUrls?.map((url, index) => (
            <Fragment key={url.finalUrlId}>
              <div className='flex items-center gap-2'>
                <span className={cn("flex justify-center items-center rounded-full w-6 h-6 font-semibold", rankColor[index])}>{index + 1}</span>
                <span className='flex-1 font-medium truncate'>{url.finalUrlName}</span>
                <span className='ml-auto font-semibold text-green-500'>{formatDollarAmount(url.totalCost)}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
