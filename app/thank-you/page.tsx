import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { EventCard } from "@/components/ui/event-card";
import { Countdown } from "@/components/ui/countdown";
import { flagshipEvent, upcomingEvents } from "@/mock/products";
import { siteConfig } from "@/lib/site-config";
import { formatEventDate } from "@/lib/utils";
import { CheckCircle2, Calendar, Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = { title: "You're in" };

export default function ThankYouPage() {
  const e = flagshipEvent();
  const more = upcomingEvents().filter((x) => x.id !== e.id).slice(0, 3);
  const d = formatEventDate(e.startsAt);
  return (
    <>
      <section className="bg-ink text-white -mt-[70px] pt-[70px] relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" />
        <div className="container-x py-16 md:py-20 max-w-3xl relative">
          <div className="chip chip-accent bg-white/15 text-white"><CheckCircle2 className="w-4 h-4" /> You&apos;re registered</div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.02] mt-6">See you Thursday.</h1>
          <p className="text-lg text-white/70 mt-5 max-w-xl">Your seat is confirmed. Everything you need is below — and also in your inbox.</p>
        </div>
      </section>

      <Section pad="md">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="card p-6 md:p-8">
              <div className="text-[11px] uppercase tracking-[.2em] muted">Your session</div>
              <div className="font-display text-2xl font-extrabold mt-2 leading-snug">{e.title}</div>
              <div className="mt-4 flex items-center gap-5 text-[13.5px] muted">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{d.weekday} {d.month} {d.day} · {d.time}</span>
              </div>
              <div className="mt-6"><Countdown target={e.startsAt} /></div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#" className="btn btn-accent">Add to calendar <Calendar className="w-4 h-4" /></a>
                <a href="#" className="btn btn-outline">Open Zoom link</a>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Step icon={Mail} title="Check your inbox" body="Receipt, Zoom link, and calendar invite. Not there? Check spam." />
              <Step icon={MessageCircle} title="Bring one question" body="The best sessions come from real audience questions. Bring a specific one." />
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="p-6 md:p-8 rounded-3xl bg-canvas border border-line">
              <div className="eyebrow mb-3">Order summary</div>
              <div className="text-[13px] muted">Order · <span className="text-[color:var(--ink)] font-medium">#KL-{Math.floor(Math.random() * 900000 + 100000)}</span></div>
              <div className="mt-4 pt-4 border-t border-line space-y-2 text-[14px]">
                <Row label="Session" value={e.title} />
                <Row label="Seats" value="1" />
                <Row label="Method" value="Card · **** 4242" />
                <Row label="Total" value="Paid in full" bold />
              </div>
              <div className="mt-5 text-[12.5px] muted">Questions? Email {siteConfig.brand.email}.</div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="paper" pad="md">
        <div className="mb-8"><div className="eyebrow">Also coming up</div><h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mt-3">More live sessions.</h2></div>
        <div className="grid md:grid-cols-3 gap-5">{more.map((m) => <EventCard key={m.id} e={m} />)}</div>
      </Section>
    </>
  );
}

function Step({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return <div className="card p-6"><div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-[color:var(--accent-ink)]"><Icon className="w-4 h-4" /></div><div className="font-display text-lg font-bold mt-4">{title}</div><p className="text-[14px] text-[color:var(--charcoal)] leading-relaxed mt-1">{body}</p></div>;
}
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return <div className="flex items-start justify-between gap-4"><span className="muted">{label}</span><span className={`text-right ${bold ? "font-medium" : ""}`}>{value}</span></div>;
}
