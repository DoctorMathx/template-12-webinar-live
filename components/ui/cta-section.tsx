import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection({
  eyebrow = "Get started",
  title,
  description,
  primary,
  secondary,
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-10 md:p-16 lg:p-20 ${
        dark ? "bg-graphite text-white" : "bg-paper text-[color:var(--ink)]"
      }`}
    >
      <div className={`absolute inset-0 pointer-events-none ${dark ? "opacity-20" : "opacity-40"} noise`} />
      <div className="relative max-w-3xl">
        <div className={`eyebrow ${dark ? "text-white/50" : ""}`}>{eyebrow}</div>
        <h2 className="font-display text-3xl md:text-5xl lg:text-[56px] font-semibold tracking-tight mt-4 leading-[1.05]">
          {title}
        </h2>
        {description && (
          <p className={`mt-5 text-[16px] md:text-lg leading-relaxed max-w-xl ${dark ? "text-white/70" : "text-[color:var(--charcoal)]"}`}>
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={primary.href}
            className={`btn btn-lg ${dark ? "bg-white text-[color:var(--ink)] hover:bg-white/90" : "btn-primary"}`}
          >
            {primary.label} <ArrowRight className="w-4 h-4" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className={`btn btn-lg ${dark ? "border border-white/25 text-white hover:bg-white/10" : "btn-outline"}`}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
