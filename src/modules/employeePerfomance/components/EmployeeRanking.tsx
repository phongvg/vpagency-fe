import Leaderboard from "@/modules/employeePerfomance/components/Leaderboard";
import LeaderboardList from "@/modules/employeePerfomance/components/LeaderboardList";
import { useEmployeeRanking } from "@/modules/employeePerfomance/hooks/useEmployeeRanking";
import type { By } from "@/modules/employeePerfomance/types/employeePerformance.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { formatDollarAmount } from "@/shared/utils/common.util";
import confetti from "canvas-confetti";
import { formatDate, startOfMonth } from "date-fns";
import { useCallback, useEffect, useRef } from "react";

const rankingCards: { title: string; key: keyof { byCost: By[]; byRef: By[]; byActiveProjects: By[] }; formatValue: (v: number) => string }[] = [
  { title: "Top Chi Phí", key: "byCost", formatValue: (v) => formatDollarAmount(v) },
  { title: "Top Ref", key: "byRef", formatValue: (v) => v.toString() },
  { title: "Top Dự Án Active", key: "byActiveProjects", formatValue: (v) => v.toString() },
];

export default function EmployeeRanking() {
  const { data: employeeRankingData } = useEmployeeRanking({
    dateFrom: formatDate(startOfMonth(new Date()), "yyyy-MM-dd"),
    dateTo: formatDate(new Date(), "yyyy-MM-dd"),
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fireConfetti = useCallback(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#FFD700", "#FFA500", "#FF6347", "#4169E1", "#9370DB"],
      });

      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#FFD700", "#FFA500", "#FF6347", "#4169E1", "#9370DB"],
      });
    }, 250);
  }, []);

  useEffect(() => {
    fireConfetti();

    const interval = setInterval(() => {
      fireConfetti();
    }, 5000);

    return () => clearInterval(interval);
  }, [fireConfetti]);

  return (
    <div className='relative'>
      <canvas ref={canvasRef} className='z-10 absolute inset-0 w-full h-full pointer-events-none' />
      <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
        {rankingCards.map(({ title, key, formatValue }) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className='normal-case'>
              <Leaderboard data={employeeRankingData?.[key] ?? []} formatValue={formatValue} />
              <LeaderboardList data={employeeRankingData?.[key] ?? []} formatValue={formatValue} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
