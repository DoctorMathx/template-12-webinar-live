import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { events, eventBySlug } from "@/mock/products";
import { testimonials } from "@/mock/testimonials";
import { faqs } from "@/mock/faqs";
import { Section, SectionHeader } from "@/components/ui/section";
import { EventCard } from "@/components/ui/event-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CtaSection } from "@/components/ui/cta-section";
import { Countdown } from "@/components/ui/countdown";
import { siteConfig } from "@/lib/site-config";
import { formatEventDate, formatPrice, typeLabel } from "@/lib/utils";
import { ArrowRight, Calendar, Check, Clock, PlayCircle, ShieldCheck, Users } from "lucide-react";

export function generateStaticParams() { return events.map((e) => ({ slug: e.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const e = eventBySlug(slug);
  return { title: e?.title ?? "Event", description: e?.shortDescription };
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = eventBySlug(slug);
  if (!e) notFound();
  const d = formatEventDate(e.startsAt);
  const related = events.filter((x) => x.id !== e.id && x.status === "upcoming").slice(0, 3);

  return (
    <>
      {/* Dark hero */}
      <section className="bg-ink text-white -mt-[70px] pt-[70px] relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" />
        <div className="container-x py-14 md:py-20 relative">
          <div className="text-[13px] text-white/60"><Link href="/events" className="hover:text-white">All events</Link><span className="mx-1.5">/</span><span>{typeLabel(e.type)}</span></div>
          <div className="grid lg:grid-cols-12 gap-12 mt-8 items-start">
            <div className="lg:col-span-7">
              {e.status === "upcoming" && <div className="chip chip-live">Live · {d.weekday} {d.month} {d.day} · {d.time}</div>}
              {e.status === "replay" && <div className="chip bg-white/10 border-white/15 text-white"><PlayCircle className="w-3.5 h-3.5" /> Replay available</div>}
              <h1 className="font-display text-4xl md:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.03] mt-5">{e.title}</h1>
              <p className="text-lg text-white/75 mt-5 max-w-xl leading-relaxed">{e.fullDescription ?? e.shortDescription}</p>
              <div className="mt-8 flex items-center gap-6 text-[13.5px] text-white/60 flex-wrap">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{d.weekday} {d.month} {d.day}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{e.duration} · {d.time}</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4" />with {e.presenter}</span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/[.05] border border-white/10 p-6 md:p-8 backdrop-blur">
                {e.status === "upcoming" ? (
                  <>
                    <div className="text-[11px] uppercase tracking-[.22em] text-white/50 font-semibold">Starts in</div>
                    <div className="mt-4"><Countdown target={e.startsAt} dark /></div>
                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                      <div><div className="text-[11px] text-white/50">Seats left</div><div className="text-white text-lg font-semibold tabular-nums">{e.seatsLeft} / {e.totalSeats}</div></div>
                      <div className="text-right"><div className="text-[11px] text-white/50">Price</div><div className="font-display text-2xl font-bold text-[color:var(--accent)] tabular-nums">{formatPrice(e.price)}</div></div>
                    </div>
                    <Link href="/register" className="btn btn-accent btn-lg w-full mt-6">Reserve seat <ArrowRight className="w-4 h-4" /></Link>
                  </>
                ) : (
                  <>
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                      <Image src={e.cover} alt="" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
                      <button className="absolute inset-0 flex items-center justify-center group" aria-label="Play"><span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-105 transition"><PlayCircle className="w-8 h-8 text-[color:var(--ink)]" /></span></button>
                    </div>
                    <Link href="/register" className="btn btn-accent btn-lg w-full mt-6">Watch replay — {formatPrice(e.price)}</Link>
                  </>
                )}
                <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-white/50 text-center">
                  {siteConfig.commerce.trust.map((t) => (<div key={t} className="flex items-start gap-1.5 text-left"><ShieldCheck className="w-3 h-3 mt-0.5 shrink-0" /><span>{t}</span></div>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <Section pad="md">
        <SectionHeader eyebrow="Agenda" title="What's happening in the session." />
        <div className="max-w-3xl border-y border-line">
          {e.agenda.map((a) => (
            <div key={a.title} className="flex items-baseline gap-6 py-5 border-b border-line last:border-0">
              <span className="font-display text-lg font-bold tabular-nums text-[color:var(--accent-ink)] w-16 shrink-0">{a.time}</span>
              <span className="text-[16px] font-medium">{a.title}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Outcomes */}
      <Section tone="canvas" pad="md">
        <SectionHeader eyebrow="What you'll leave with" title="Three specific outcomes." />
        <div className="grid md:grid-cols-3 gap-5">
          {e.outcomes.map((o, i) => (<div key={o} className="card p-6"><div className="text-[12px] muted tabular-nums">{String(i + 1).padStart(2, "0")}</div><p className="mt-3 text-[16px] font-medium leading-snug">{o}</p></div>))}
        </div>
      </Section>

      {/* Who / includes */}
      <Section pad="md">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="eyebrow mb-3">Who this is for</div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">You&apos;ll get the most from this if…</h2>
            <ul className="mt-6 space-y-3">{e.whoFor.map((w) => (<li key={w} className="flex items-start gap-3"><Users className="w-4 h-4 mt-1 shrink-0" /><span className="text-[15px] text-[color:var(--charcoal)] leading-relaxed">{w}</span></li>))}</ul>
          </div>
          <div>
            <div className="eyebrow mb-3">What&apos;s included</div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">In your ticket.</h2>
            <ul className="mt-6 space-y-3">{e.includes.map((i) => (<li key={i} className="flex items-start gap-3"><span className="mt-1 w-5 h-5 rounded-full bg-accent-soft flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-[color:var(--accent-ink)]" /></span><span className="text-[15px] text-[color:var(--charcoal)] leading-relaxed">{i}</span></li>))}</ul>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="paper" pad="md">
        <SectionHeader eyebrow="Attendee notes" title="What people say after." />
        <div className="grid md:grid-cols-3 gap-5">{testimonials.slice(0, 3).map((t) => <TestimonialCard key={t.id} t={t} />)}</div>
      </Section>

      {/* FAQ */}
      <Section pad="md">
        <div className="grid lg:grid-cols-12 gap-12"><div className="lg:col-span-5"><SectionHeader eyebrow="FAQ" title="Session questions." /><Link href="/faq" className="btn btn-outline">Full FAQ</Link></div><div className="lg:col-span-7"><FaqAccordion items={faqs.slice(0, 6)} /></div></div>
      </Section>

      {related.length > 0 && (
        <Section tone="canvas" pad="md">
          <SectionHeader eyebrow="More live sessions" title="Also coming up." />
          <div className="grid md:grid-cols-3 gap-5">{related.map((r) => <EventCard key={r.id} e={r} />)}</div>
        </Section>
      )}

      <Section pad="sm">
        <CtaSection eyebrow="One click away" title="Reserve your seat now." description={siteConfig.commerce.trust.join(" · ")} primary={{ label: `Reserve — ${formatPrice(e.price)}`, href: "/register" }} secondary={{ label: "See all events", href: "/events" }} />
      </Section>
    </>
  );
}
