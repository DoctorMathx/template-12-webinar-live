"use client";
import { useEffect, useState } from "react";

export function Countdown({ target, dark }: { target: string; dark?: boolean }) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const cls = dark ? "text-white" : "text-[color:var(--ink)]";
  const sub = dark ? "text-white/50" : "muted";
  const cell = dark ? "bg-white/5 border border-white/10" : "bg-white border border-line";
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {[{ v: days, l: "Days" }, { v: hours, l: "Hours" }, { v: mins, l: "Mins" }, { v: secs, l: "Secs" }].map((c) => (
        <div key={c.l} className={`rounded-xl ${cell} py-3 sm:py-4 text-center`}>
          <div className={`font-display text-2xl sm:text-4xl font-bold tabular-nums ${cls}`}>{String(c.v).padStart(2, "0")}</div>
          <div className={`text-[10px] uppercase tracking-[.16em] mt-1 ${sub}`}>{c.l}</div>
        </div>
      ))}
    </div>
  );
}
