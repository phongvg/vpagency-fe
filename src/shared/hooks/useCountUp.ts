import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  duration?: number;
  start?: number;
  decimals?: number;
  enableScrollSpy?: boolean;
}

export function useCountUp(end: number = 0, options: UseCountUpOptions = {}) {
  const { duration = 2000, start = 0, decimals = 0, enableScrollSpy = false } = options;

  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(!enableScrollSpy);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const difference = endValue - startValue;

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = startValue + difference * easedProgress;

      setCount(parseFloat(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, start, duration, decimals, hasStarted]);

  useEffect(() => {
    if (!enableScrollSpy || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [enableScrollSpy, hasStarted]);

  return { count, ref: elementRef };
}
