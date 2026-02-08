import { projectDailyMetricsConfig } from "@/modules/projectDailyStats/configs/project-daily-metrics.config";
import type { AggregatedMetrics } from "@/modules/projectDailyStats/types/projectDailyMetrics.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";

interface ProjectDailyMetricsProps {
  aggregatedData: AggregatedMetrics;
}

export default function ProjectDailyMetrics({ aggregatedData }: ProjectDailyMetricsProps) {
  const { user } = useAuthStore();
  const userRoles = user?.roles || [];

  const visibleMetrics = projectDailyMetricsConfig.filter((metric) => {
    if (!metric.allowedRoles) return true;
    return metric.allowedRoles.some((role) => userRoles.includes(role));
  });

  return (
    <div className='gap-2 grid grid-cols-5'>
      {visibleMetrics.map(({ key, label, format }) => {
        const rawValue = aggregatedData[key] ?? 0;
        const displayValue = format ? format(rawValue) : rawValue;

        return (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>

            <CardContent className='p-2'>{displayValue}</CardContent>
          </Card>
        );
      })}
    </div>
  );
}
