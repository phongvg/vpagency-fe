import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Separator } from "@/shared/components/ui/separator";
import { formatDollarAmount } from "@/shared/utils/common.util";
import clsx from "clsx";
import React from "react";

const MOCK_PROJECT_RANKINGS = [
  {
    projectId: "695f137969c9da2537bf8d5d",
    projectName: "Quotex dg",
    profit: 33408.68,
  },
  {
    projectId: "6947c72f5fc458cba12fe71b",
    projectName: "Pocket Opion - Link minhvu",
    profit: 16544.19,
  },
  {
    projectId: "6947c7635fc458cba12fe71d",
    projectName: "Pocket Option - Link sen",
    profit: 10394.2,
  },
  {
    projectId: "695c8f0dc91613db704da1c8",
    projectName: "FusionmarketsS - FBS",
    profit: 5963.42,
  },
  {
    projectId: "69675e3121036ea10e962214",
    projectName: "AvatradeTony",
    profit: 4334.92,
  },
  {
    projectId: "6947c77b5fc458cba12fe71e",
    projectName: "Axiom - Link marry",
    profit: 3588.93,
  },
  {
    projectId: "69255fd536ac275b6c5e3731",
    projectName: "GTCFX",
    profit: 2094.54,
  },
  {
    projectId: "6947c78e5fc458cba12fe71f",
    projectName: "Axiom - Link sau",
    profit: 2049.81,
  },
  {
    projectId: "695c8955c91613db704da187",
    projectName: "Exness - mike",
    profit: 1850.36,
  },
  {
    projectId: "6962018e21036ea10e961e95",
    projectName: "BingxPanda",
    profit: 1134.22,
  },
];

const rankColor: Record<number, string> = {
  0: "bg-primary",
  1: "bg-gray-400",
  2: "bg-amber-600",
};

export default function ProjectRankingsCard() {
  return (
    <ScrollArea className='h-full w-full rounded-md border'>
      <div className='p-4'>
        <h4 className='mb-4 text-xl leading-none font-bold text-primary'>BXH dự án theo lợi nhuận</h4>

        {MOCK_PROJECT_RANKINGS.map((project, index) => (
          <React.Fragment key={project.projectId}>
            <div className='flex items-center gap-2'>
              <span className={clsx("w-6 h-6 text-xs font-semibold rounded-full flex items-center justify-center", rankColor[index])}>
                {index + 1}
              </span>
              <span className='flex-1 font-medium truncate'>{project.projectName}</span>
              <span className='text-lg font-semibold text-green-500 ml-auto'>{formatDollarAmount(project.profit)}</span>
            </div>
            <Separator className='my-2' />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
