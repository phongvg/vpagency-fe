import { Badge } from "@/shared/components/ui/badge";

interface BadgeStatusProps {
  status: string | null | undefined;
}

const STATUS_COLOR: Record<string, string> = {
  "Đang hoạt động": "bg-green-50 text-green-500",
  "Ngừng hoạt động": "bg-red-50 text-red-500",
};

export default function BadgeStatus({ status }: BadgeStatusProps) {
  if (!status) return null;

  return <Badge className={`font-semibold rounded-lg ${STATUS_COLOR[status] || "bg-red-50 text-red-700"}`}>{status}</Badge>;
}
