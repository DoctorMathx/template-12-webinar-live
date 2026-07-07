import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, PlayCircle, Users } from "lucide-react";
import type { LiveEvent } from "@/lib/types";
import { formatEventDate, formatPrice, typeLabel } from "@/lib/utils";

export function EventCard({ e }: { e: LiveEvent }) {
  const d = formatEventDate(e.startsAt);
  return (
    <Link href={`/events/${e.slug}`} className="card group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] bg-canvas overflow-hidden">
        <Image src={e.cover} alt={e.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {e.status === "live" && <span className="chip chip-live">Live now</span>}
          {e.status === "replay" && <span className="chip bg-white/95 backdrop-blur"><PlayCircle className="w-3 h-3" /> Replay</span>}
          {e.status === "upcoming" && <span className="chip chip-accent">{typeLabel(e.type)}</span>}
        </div>
        <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 backdrop-blur px-3 py-2 text-center min-w-[54px]">
          <div className="text-[10px] uppercase tracking-[.16em] muted">{d.month}</div>
          <div className="font-display text-xl font-bold tabular-nums leading-none">{d.day}</div>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-[12px] muted flex items-center gap-3">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{d.weekday} · {d.time}</span>
          <span className="w-1 h-1 rounded-full bg-[color:var(--slate)]" />
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{e.duration}</span>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug mt-3 line-clamp-2 tracking-tight">{e.title}</h3>
        <p className="text-[13.5px] text-[color:var(--charcoal)] mt-2 line-clamp-2 leading-relaxed">{e.shortDescription}</p>
        <div className="mt-auto pt-4 flex items-end justify-between border-t border-line">
          <div>
            <div className="text-[15px] font-semibold tabular-nums">{formatPrice(e.price)}</div>
            <div className="text-[11.5px] muted mt-0.5">with {e.presenter}</div>
          </div>
          {e.seatsLeft !== undefined && e.status === "upcoming" && (
            <div className="text-[11.5px] muted flex items-center gap-1"><Users className="w-3 h-3" /><span className="tabular-nums">{e.seatsLeft} seats left</span></div>
          )}
        </div>
      </div>
    </Link>
  );
}
