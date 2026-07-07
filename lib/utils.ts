import { siteConfig } from "./site-config";
export function formatPrice(v: number, currency = siteConfig.commerce.currency) { return v === 0 ? "Free" : `${currency}${v.toLocaleString("en-NG")}`; }
export function cn(...c: (string | false | null | undefined)[]) { return c.filter(Boolean).join(" "); }
export function typeLabel(t: string) { return ({ workshop: "Workshop", masterclass: "Masterclass", panel: "Panel", ama: "AMA" } as Record<string, string>)[t] ?? t; }
export function formatEventDate(iso: string) {
  const d = new Date(iso);
  return { day: d.getDate(), month: d.toLocaleString("en-US", { month: "short" }), weekday: d.toLocaleString("en-US", { weekday: "short" }), time: d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) + " WAT" };
}
