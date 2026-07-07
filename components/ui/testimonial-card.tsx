import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ t, tone = "light" }: { t: Testimonial; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <figure
      className={`p-6 md:p-7 rounded-2xl border transition-colors ${
        isDark ? "bg-white/[.04] border-white/10 text-white" : "bg-white border-line"
      }`}
    >
      {t.rating && (
        <div className="flex items-center gap-0.5 mb-4">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current text-[color:var(--warn)]" />
          ))}
        </div>
      )}
      <blockquote className={`text-[15px] leading-relaxed ${isDark ? "text-white/90" : "text-[color:var(--charcoal)]"}`}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-[13px] ${
            isDark ? "bg-white/10 text-white" : "bg-paper text-[color:var(--ink)]"
          }`}
        >
          {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div>
          <div className={`text-[13.5px] font-medium ${isDark ? "text-white" : "text-[color:var(--ink)]"}`}>{t.name}</div>
          {t.role && <div className={`text-[12px] ${isDark ? "text-white/60" : "muted"}`}>{t.role}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
