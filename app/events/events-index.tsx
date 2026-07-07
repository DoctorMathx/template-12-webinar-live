"use client";
import { useMemo, useState } from "react";
import { EventCard } from "@/components/ui/event-card";
import { events } from "@/mock/products";
import type { EventCategory, EventStatus } from "@/lib/types";

const STATUSES: { id: EventStatus | "all"; label: string }[] = [
  { id: "all", label: "All" }, { id: "upcoming", label: "Upcoming" }, { id: "replay", label: "Replays" },
];
const CATS: { id: EventCategory | "all"; label: string }[] = [
  { id: "all", label: "All topics" },
  { id: "marketing", label: "Marketing" },
  { id: "product", label: "Product" },
  { id: "sales", label: "Sales" },
  { id: "leadership", label: "Leadership" },
  { id: "money", label: "Money" },
  { id: "creative", label: "Creative" },
];

export function EventsIndex() {
  const [status, setStatus] = useState<EventStatus | "all">("all");
  const [cat, setCat] = useState<EventCategory | "all">("all");

  const list = useMemo(() => {
    let l = [...events];
    if (status !== "all") l = l.filter((e) => e.status === status);
    if (cat !== "all") l = l.filter((e) => e.category === cat);
    l.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
    return l;
  }, [status, cat]);

  return (
    <>
      <section className="bg-ink text-white -mt-[70px] pt-[70px] relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" />
        <div className="container-x py-16 md:py-24 max-w-4xl relative">
          <div className="chip chip-live">Live every Thursday</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.02] mt-6">All events, in one place.</h1>
          <p className="text-lg text-white/70 mt-6 max-w-2xl">Upcoming live sessions and every recording from the past year. Filter by topic or format.</p>
        </div>
      </section>

      <section className="sticky top-[70px] z-30 bg-white/95 backdrop-blur border-b border-line">
        <div className="container-x py-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-2 -mx-2 px-2 overflow-x-auto no-scrollbar">
            {STATUSES.map((s) => (<button key={s.id} onClick={() => setStatus(s.id)} className={`chip whitespace-nowrap ${status === s.id ? "chip-dark" : "hover:border-[color:var(--ink)]"}`}>{s.label}</button>))}
          </div>
          <div className="flex items-center gap-2 -mx-2 px-2 overflow-x-auto no-scrollbar">
            {CATS.map((c) => (<button key={c.id} onClick={() => setCat(c.id)} className={`chip whitespace-nowrap ${cat === c.id ? "chip-accent" : "hover:border-[color:var(--ink)]"}`}>{c.label}</button>))}
          </div>
        </div>
      </section>

      <div className="container-x pt-8"><span className="chip">{list.length} events</span></div>

      <div className="container-x py-10 md:py-14">
        {list.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-line rounded-3xl">
            <p className="font-display text-2xl font-bold">No events match those filters.</p>
            <p className="muted mt-2 text-[14px]">Try a different topic or format.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">{list.map((e) => <EventCard key={e.id} e={e} />)}</div>
        )}
      </div>
    </>
  );
}
