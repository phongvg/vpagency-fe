import { Badge } from "@/shared/components/ui/badge";

interface BadgeStatusProps {
  status: string;
}

const STATUS_COLOR: Record<string, string> = {
  "Đang hoạt động": "bg-green-50 text-green-500",
  "Ngừng hoạt động": "bg-red-50 text-red-500",
};

export default function BadgeStatus({ status }: BadgeStatusProps) {
  return <Badge className={`font-semibold rounded-md ${STATUS_COLOR[status] || "bg-red-50 text-red-500"}`}>{status}</Badge>;
}
