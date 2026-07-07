import Link from "next/link";
import { Check } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";

export type PricingCardProps = {
  name: string;
  price: number;
  interval?: "month" | "year" | "one-time";
  tagline?: string;
  duration?: string;
  features: string[];
  cta: string;
  href?: string;
  featured?: boolean;
};

export function PricingCard({
  name,
  price,
  interval,
  tagline,
  duration,
  features,
  cta,
  href = "/checkout",
  featured,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col p-7 md:p-8 rounded-2xl border transition-shadow",
        featured
          ? "bg-[color:var(--ink)] text-white border-[color:var(--ink)] shadow-[0_20px_60px_-30px_rgba(14,17,22,.5)]"
          : "bg-white border-line"
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-7 chip chip-accent">Most popular</span>
      )}
      <div>
        <div className={cn("text-[13px] font-medium tracking-wide", featured ? "text-white/70" : "muted")}>
          {name}
        </div>
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="font-display text-4xl md:text-[42px] font-semibold tracking-tight">
            {price === 0 ? "Free" : formatPrice(price)}
          </span>
          {interval && interval !== "one-time" && (
            <span className={cn("text-[13px]", featured ? "text-white/70" : "muted")}>/ {interval}</span>
          )}
        </div>
        {tagline && (
          <p className={cn("mt-3 text-[14px] leading-relaxed", featured ? "text-white/80" : "text-[color:var(--charcoal)]")}>
            {tagline}
          </p>
        )}
        {duration && (
          <div className={cn("mt-2 text-[12.5px]", featured ? "text-white/60" : "muted")}>{duration}</div>
        )}
      </div>

      <ul className="mt-8 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                featured ? "bg-white/15" : "bg-paper"
              )}
            >
              <Check className={cn("w-3 h-3", featured ? "text-white" : "text-[color:var(--ink)]")} />
            </span>
            <span className={cn("text-[14px] leading-relaxed", featured ? "text-white/90" : "text-[color:var(--charcoal)]")}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={cn(
          "mt-8 btn btn-lg w-full",
          featured ? "bg-white text-[color:var(--ink)] hover:bg-white/90" : "btn-primary"
        )}
      >
        {cta}
      </Link>
    </div>
  );
}
