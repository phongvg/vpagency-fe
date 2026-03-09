import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";

interface ProjectProgressProps {
  value: number; // 0 - 100
  size?: number; // px
  strokeWidth?: number;
}

export default function ProjectProgressCard({ value, size = 200, strokeWidth = 10 }: ProjectProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dự án đang chạy</CardTitle>
      </CardHeader>

      <CardContent className='flex justify-center items-center'>
        <div className='inline-flex relative justify-center items-center' style={{ width: size, height: size }}>
          <svg width={size} height={size} className='rotate-[-90deg]'>
            <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} className='fill-none stroke-muted-foreground/20' />

            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className='fill-none stroke-primary transition-all duration-300'
            />
          </svg>

          <span className='absolute font-semibold text-foreground text-xl'>{value}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
