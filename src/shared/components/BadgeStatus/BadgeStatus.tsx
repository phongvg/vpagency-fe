import { ProjectDailyStatsStatus } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { Badge } from "@/shared/components/ui/badge";

interface BadgeStatusProps {
  status: string | null | undefined;
}

const STATUS_COLOR: Record<string, string> = {
  "Đang hoạt động": "bg-green-400/10 text-green-400",
  "Ngừng hoạt động": "bg-red-400/10 text-red-400",
  [ProjectDailyStatsStatus.Completed]: "bg-green-400/10 text-green-400",
  [ProjectDailyStatsStatus.Pending]: "bg-yellow-400/10 text-yellow-400",
};

export default function BadgeStatus({ status }: BadgeStatusProps) {
  if (!status) return null;

  return <Badge className={`font-semibold rounded-lg ${STATUS_COLOR[status] || "bg-red-400/10 text-red-400"}`}>{status}</Badge>;
}
