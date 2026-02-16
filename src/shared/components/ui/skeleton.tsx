import { cn } from "@/shared/libs/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-slate-500 rounded-md animate-pulse", className)} {...props} />;
}

export { Skeleton };
