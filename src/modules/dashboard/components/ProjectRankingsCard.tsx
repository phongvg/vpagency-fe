import { useTopProjectByProfit } from "@/modules/dashboard/hooks/useTopProjectByProfit";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

const rankColor: Record<number, string> = {
  0: "bg-primary",
  1: "bg-gray-400",
  2: "bg-amber-600",
};

export default function ProjectRankingsCard() {
  const { data: topProjects } = useTopProjectByProfit();

  return (
    <ScrollArea className='border rounded-md w-full h-full'>
      {/* <div className='p-4'>
        <h4 className='mb-4 font-bold text-primary text-xl leading-none'>BXH dự án theo lợi nhuận</h4>

        {topProjects?.map((project, index) => (
          <React.Fragment key={project.projectId}>
            <div className='flex items-center gap-2'>
              <span className={clsx("flex justify-center items-center rounded-full w-6 h-6 font-semibold text-xs", rankColor[index])}>
                {index + 1}
              </span>
              <span className='flex-1 font-medium truncate'>{project.projectName}</span>
              <span className='ml-auto font-semibold text-green-500 text-lg'>{formatDollarAmount(project.profit)}</span>
            </div>
            <Separator className='my-2' />
          </React.Fragment>
        ))}
      </div> */}
    </ScrollArea>
  );
}
