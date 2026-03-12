import Leaderboard from "@/modules/dashboard/components/Leaderboard";
import LeaderboardList from "@/modules/dashboard/components/LeaderboardList";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import confetti from "canvas-confetti";
import { useCallback, useEffect, useRef } from "react";

export default function EmployeeRanking() {
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
    <Card className='relative overflow-hidden'>
      <canvas ref={canvasRef} className='absolute inset-0 pointer-events-none' style={{ width: "100%", height: "100%" }} />
      <CardHeader>
        <CardTitle>Bảng xếp hạng nhân viên</CardTitle>
      </CardHeader>

      <CardContent className='normal-case'>
        <Leaderboard />
        <LeaderboardList />
      </CardContent>
    </Card>
  );
}
