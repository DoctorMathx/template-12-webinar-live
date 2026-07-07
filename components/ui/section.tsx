import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "white",
  pad = "lg",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "canvas" | "paper" | "graphite";
  pad?: "sm" | "md" | "lg";
  id?: string;
}) {
  const tones = {
    white: "bg-white",
    canvas: "bg-canvas",
    paper: "bg-paper",
    graphite: "bg-graphite text-white",
  } as const;
  const pads = {
    sm: "py-14",
    md: "py-20",
    lg: "py-24 md:py-28",
  } as const;
  return (
    <section id={id} className={cn(tones[tone], pads[pad], className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  const isCenter = align === "center";
  return (
    <div className={cn("mb-12 md:mb-16 flex flex-col gap-4", isCenter && "items-center text-center max-w-2xl mx-auto")}>
      <div className="w-full flex items-end justify-between gap-8">
        <div className={cn(isCenter && "mx-auto")}>
          {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
          <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-semibold leading-[1.1] tracking-tight">
            {title}
          </h2>
          {lede && <p className="prose-lede mt-4 max-w-xl">{lede}</p>}
        </div>
        {action && !isCenter && <div className="hidden md:block shrink-0">{action}</div>}
      </div>
      {action && isCenter && <div className="mt-2">{action}</div>}
    </div>
  );
}
