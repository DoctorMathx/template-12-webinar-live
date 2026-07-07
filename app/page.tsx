import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MessageCircle, PlayCircle, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { EventCard } from "@/components/ui/event-card";
import { Countdown } from "@/components/ui/countdown";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { siteConfig } from "@/lib/site-config";
import { events, flagshipEvent, upcomingEvents, replayEvents } from "@/mock/products";
import { testimonials, proofStats } from "@/mock/testimonials";
import { faqs } from "@/mock/faqs";
import { formatEventDate, formatPrice, typeLabel } from "@/lib/utils";

export default function HomePage() {
  const next = flagshipEvent();
  const upcoming = upcomingEvents().slice(0, 4);
  const replays = replayEvents().slice(0, 3);
  const nextDate = formatEventDate(next.startsAt);

  return (
    <>
      {/* Cinematic dark hero */}
      <section className="relative bg-ink text-white overflow-hidden -mt-[70px] pt-[70px]">
        <div className="absolute inset-0 aurora opacity-70 pointer-events-none" />
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />
        <div className="container-x pt-16 md:pt-20 pb-16 md:pb-24 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="chip chip-live">Live · Thursday 6:00 PM WAT</div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-[80px] lg:text-[96px] font-extrabold tracking-tighter leading-[0.98] mt-6">
                Live workshops<br />for people who <span className="text-[color:var(--accent)] italic">take notes.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mt-7 max-w-xl leading-relaxed">
                {siteConfig.brand.name} runs one live workshop a week for African founders, marketers and operators.
                Same day, same time, always practical.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={siteConfig.hero.primaryCta.href} className="btn btn-accent btn-lg">{siteConfig.hero.primaryCta.label} <ArrowRight className="w-4 h-4" /></Link>
                <Link href={siteConfig.hero.secondaryCta.href} className="btn btn-outline-light btn-lg">{siteConfig.hero.secondaryCta.label}</Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-[13px] text-white/60 flex-wrap">
                {siteConfig.commerce.trust.map((t) => (<span key={t} className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" />{t}</span>))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/[.05] border border-white/10 p-6 md:p-8 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[.24em] text-white/50 font-semibold">Next live session</div>
                <h3 className="font-display text-2xl md:text-[26px] font-bold mt-3 leading-tight">{next.title}</h3>
                <div className="mt-4 flex items-center gap-5 text-[13px] text-white/70">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{nextDate.weekday} {nextDate.month} {nextDate.day}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{nextDate.time}</span>
                </div>
                <div className="mt-6"><Countdown target={next.startsAt} dark /></div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <div><div className="text-[11px] text-white/50">Seats left</div><div className="text-white text-lg font-semibold tabular-nums">{next.seatsLeft} / {next.totalSeats}</div></div>
                  <Link href={`/events/${next.slug}`} className="btn btn-accent">Reserve — {formatPrice(next.price)}</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {proofStats.map((s) => (
              <div key={s.label} className="border-t border-white/10 pt-4"><div className="font-display text-3xl md:text-4xl font-bold tabular-nums text-[color:var(--accent)]">{s.value}</div><div className="text-[12px] text-white/50 mt-1">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section pad="lg">
        <SectionHeader eyebrow="How it works" title="One live session a week. That's it." lede="Every Thursday. Live on Zoom. Real Q&A. Recording sent after." align="center" />
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { icon: Zap, title: "Reserve your seat", body: "Pick a session, pay in one click. You'll get the Zoom link instantly." },
            { icon: Sparkles, title: "Show up Thursday", body: "6:00 PM WAT. Sessions run 60–90 minutes with a proper Q&A." },
            { icon: MessageCircle, title: "Ask a real question", body: "Every session includes live Q&A. Come with something specific." },
            { icon: PlayCircle, title: "Watch the replay", body: "Every ticket includes 7 days of replay access. Season Pass = lifetime." },
          ].map((s) => { const Icon = s.icon; return (<div key={s.title} className="card p-6"><div className="w-11 h-11 rounded-xl bg-accent-soft text-[color:var(--accent-ink)] flex items-center justify-center"><Icon className="w-5 h-5" /></div><h3 className="font-display text-lg font-bold mt-4">{s.title}</h3><p className="text-[14px] text-[color:var(--charcoal)] leading-relaxed mt-2">{s.body}</p></div>); })}
        </div>
      </Section>

      {/* Upcoming events */}
      <Section tone="paper" pad="lg">
        <SectionHeader eyebrow="What's coming up" title="The next four sessions." lede="Book one seat at a time, or grab the season pass and save 40%." action={<Link href="/events" className="btn btn-outline btn-sm">All events <ArrowRight className="w-3.5 h-3.5" /></Link>} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {upcoming.map((e) => <EventCard key={e.id} e={e} />)}
        </div>
      </Section>

      {/* Season pass */}
      <Section pad="lg">
        <div className="rounded-3xl bg-ink text-white p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 aurora opacity-70" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="chip chip-accent bg-white/15 text-white">Best value</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.02] mt-5">The <span className="text-[color:var(--accent)] italic">Season Pass.</span></h2>
              <p className="text-lg text-white/70 mt-5 max-w-lg leading-relaxed">All 12 live sessions this quarter, plus lifetime access to every replay from the past year. About 40% cheaper than buying seats one at a time.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/events/season-pass-q3" className="btn btn-accent btn-lg">Get the Q3 pass — {formatPrice(45000)} <ArrowRight className="w-4 h-4" /></Link>
                <span className="text-[13px] text-white/50">Teams of 3+ save 30%</span>
              </div>
            </div>
            <div>
              <ul className="space-y-3 text-white/80 text-[15px]">
                {["12 live sessions across Q3 (₦90k+ value)", "Full replay archive · 60+ hours", "Season-pass community", "20% off any masterclass this year", "Priority Q&A queue in every session"].map((f) => (<li key={f} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] mt-2.5 shrink-0" />{f}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Replays */}
      <Section tone="paper" pad="lg">
        <SectionHeader eyebrow="Replays" title="Missed one? Watch it on demand." action={<Link href="/events?status=replay" className="btn btn-outline btn-sm">All replays <ArrowRight className="w-3.5 h-3.5" /></Link>} />
        <div className="grid md:grid-cols-3 gap-5">
          {replays.map((r) => <EventCard key={r.id} e={r} />)}
        </div>
      </Section>

      {/* Host */}
      <Section pad="lg">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-md rounded-3xl overflow-hidden bg-canvas border border-line">
              <Image src={siteConfig.host.portrait} alt={siteConfig.host.name} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow">Your host</div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mt-3">{siteConfig.host.name}</h2>
            <p className="text-[15px] muted mt-2">{siteConfig.host.role}</p>
            <p className="prose-lede mt-5 max-w-xl">{siteConfig.host.shortBio}</p>
            <p className="mt-6 text-[14px] muted flex items-center gap-2"><Users className="w-4 h-4" /> {siteConfig.host.metric}</p>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="canvas" pad="lg">
        <SectionHeader eyebrow="Attendee notes" title="What people say after." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{testimonials.slice(0, 6).map((t) => <TestimonialCard key={t.id} t={t} />)}</div>
      </Section>

      {/* FAQ */}
      <Section pad="lg">
        <div className="grid lg:grid-cols-12 gap-12"><div className="lg:col-span-5"><SectionHeader eyebrow="Frequently asked" title="Before you book." /><Link href="/faq" className="btn btn-outline">Full FAQ</Link></div><div className="lg:col-span-7"><FaqAccordion items={faqs.slice(0, 6)} /></div></div>
      </Section>
    </>
  );
}
