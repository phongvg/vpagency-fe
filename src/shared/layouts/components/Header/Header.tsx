import MayBay1 from "@/assets/image/may_bay_1-removebg-preview.png";
import MayBay2 from "@/assets/image/may_bay_2-removebg-preview.png";
import MayBay3 from "@/assets/image/may_bay_3-removebg-preview.png";
import MayBay4 from "@/assets/image/may_bay_4-removebg-preview.png";
import MayBay5 from "@/assets/image/may_bay_5-removebg-preview.png";
import MayBay6 from "@/assets/image/may_bay_6-removebg-preview.png";
import MayBay7 from "@/assets/image/may_bay_7-removebg-preview.png";
import MayBay8 from "@/assets/image/may_bay_8-removebg-preview.png";
import Mua1 from "@/assets/image/mua_1-removebg-preview.png";
import Mua2 from "@/assets/image/mua_2-removebg-preview.png";
import Mua3 from "@/assets/image/mua_3-removebg-preview.png";
import Mua4 from "@/assets/image/mua_4-removebg-preview.png";
import Mua6 from "@/assets/image/mua_6-removebg-preview.png";
import Mua8 from "@/assets/image/mua_8-removebg-preview (1).png";
import Mua9 from "@/assets/image/mua_9-removebg-preview.png";
import { useCurrentRoute } from "@/shared/hooks/useCurrentRoute";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const MAY_BAY_SRCS = [MayBay1, MayBay2, MayBay3, MayBay4, MayBay5, MayBay6, MayBay7, MayBay8];
const MUA_SRCS = [Mua1, Mua2, Mua3, Mua4, Mua6, Mua8, Mua9];

const RAINY_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99]);
function isRainyCode(code: number) { return RAINY_CODES.has(code); }

function getWeatherInfo(code: number): { emoji: string; label: string } {
  if (code === 0) return { emoji: "☀️", label: "CLEAR" };
  if (code <= 2) return { emoji: "⛅", label: "PARTLY" };
  if (code === 3) return { emoji: "☁️", label: "CLOUDY" };
  if (code <= 49) return { emoji: "🌫️", label: "FOGGY" };
  if (code <= 67) return { emoji: "🌧️", label: "RAINY" };
  if (code <= 77) return { emoji: "❄️", label: "SNOWY" };
  if (code <= 82) return { emoji: "🌦️", label: "SHOWER" };
  return { emoji: "⛈️", label: "STORM" };
}

function HudStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "rgb(252, 224, 166)", opacity: 0.85 }}
        className="uppercase tracking-widest">
        {label}
      </span>
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "11px", letterSpacing: "0.05em", color: "rgb(252, 224, 166)" }}
        className="mt-1">
        {value}
      </span>
    </div>
  );
}

// ⚠️ TEST_RAINY = true để test trời mưa, false để dùng API thật
const TEST_RAINY = false;

// Bỏ dấu tiếng Việt
function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

export default function Header() {
  const currentRoute = useCurrentRoute();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const [weather, setWeather] = useState<{ emoji: string; label: string; temp: number; rainy: boolean } | null>(
    TEST_RAINY ? { emoji: "🌧️", label: "RAINY", temp: 28, rainy: true } : null
  );

  useEffect(() => {
    if (TEST_RAINY) return; // bỏ qua API khi đang test

    const apply = (code: number, temp: number) =>
      setWeather({ ...getWeatherInfo(code), temp, rainy: isRainyCode(code) });

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code`
          );
          const data = await res.json();
          apply(data.current.weather_code, Math.round(data.current.temperature_2m));
        } catch { /* ignore */ }
      },
      () => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.83&current=temperature_2m,weather_code")
          .then(r => r.json())
          .then(data => apply(data.current.weather_code, Math.round(data.current.temperature_2m)))
          .catch(() => { });
      }
    );
  }, []);

  const imageSrcs = useMemo(() => (weather?.rainy ? MUA_SRCS : MAY_BAY_SRCS), [weather?.rainy]);

  const clouds = useMemo(() =>
    Array.from({ length: 42 }, (_, i) => {
      const duration = 32 + (i % 8) * 3;
      // Delay âm = bắt đầu giữa chu kỳ → chạy ngay, mỗi đám mây ở vị trí khác nhau
      const negativeDelay = -((i * duration) / 42);
      const topOptions = ["4px", "8px"];
      return {
        src: imageSrcs[i % imageSrcs.length],
        top: topOptions[i % topOptions.length],
        opacity: 0.5 + (i % 5) * 0.09,
        height: [32, 36, 40, 44, 38][i % 5],
        delay: `${negativeDelay.toFixed(1)}s`,
        duration: `${duration}s`,
        flip: i % 3 === 1,
      };
    }),
    [imageSrcs]
  );

  const dateStr = now.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "2-digit" });
  const timeStr = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <header
      className="sticky top-0 w-full z-20 flex items-center justify-between px-5 py-4 mario-border border-t-0 border-x-0 shadow-lg overflow-hidden"
      style={{ minHeight: "72px", backgroundColor: weather?.rainy ? "#00082c" : "#5c94fc", transition: "background-color 1s ease" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <style>{`
          @keyframes cloud-scroll {
            from { transform: translateX(calc(100vw + 200px)); }
            to   { transform: translateX(-200px); }
          }
        `}</style>
        {clouds.map((cloud, i) => (
          <img key={i} src={cloud.src} alt=""
            style={{
              position: "absolute", top: cloud.top,
              height: `${cloud.height}px`, width: "auto",
              opacity: cloud.opacity,
              transform: cloud.flip ? "scaleX(-1)" : undefined,
              animation: `cloud-scroll ${cloud.duration} linear ${cloud.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col justify-center min-w-0 z-10">
        <h1 className="uppercase drop-shadow-md tracking-wide leading-tight truncate"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "13px", color: "rgb(252, 224, 166)" }}>
          {removeAccents(currentRoute?.pageTitle ?? "Dashboard")}
        </h1>
        {pathSegments.length > 1 && (
          <div className="flex items-center gap-1 text-white/60 text-[10px] mt-0.5">
            <span>Home</span>
            {pathSegments.map((seg, i) => (
              <span key={i} className="flex items-center gap-1">
                <span>/</span>
                <span className={i === pathSegments.length - 1 ? "text-[#fce0a6] font-semibold" : ""}>
                  {seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-6">
        <HudStat label="DATE" value={dateStr} />
        <HudStat label="TIME" value={timeStr} />
        {weather && <HudStat label="WEATHER" value={`${weather.emoji} ${weather.temp}°C`} />}
      </div>
    </header>
  );
}
