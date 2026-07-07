import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CtaSection } from "@/components/ui/cta-section";
import { faqs } from "@/mock/faqs";

export const metadata: Metadata = { title: "FAQ" };

const TOPICS = [
  { id: "access", label: "Access & delivery" }, { id: "replay", label: "Replays" }, { id: "refund", label: "Refunds" }, { id: "team", label: "Teams & sponsors" }, { id: "format", label: "Format & tech" },
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-ink text-white -mt-[70px] pt-[70px] relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" />
        <div className="container-x py-16 md:py-20 max-w-4xl relative">
          <div className="chip chip-live">Help centre</div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.02] mt-6">Everything, in one place.</h1>
          <p className="text-lg text-white/70 mt-5 max-w-2xl">Ticket access, replays, refunds, teams, and tech. Can&apos;t find your answer? <Link href="/contact" className="underline underline-offset-4">Message us</Link>.</p>
        </div>
      </section>
      <Section pad="md">
        <div className="grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3"><div className="lg:sticky lg:top-24"><div className="eyebrow mb-4">Topics</div><nav className="flex flex-col gap-1">{TOPICS.map((t) => <a key={t.id} href={`#${t.id}`} className="px-3 py-2 rounded-lg text-[14px] muted hover:text-[color:var(--ink)] hover:bg-paper">{t.label}</a>)}</nav></div></aside>
          <div className="lg:col-span-9 space-y-14">
            {TOPICS.map((t) => { const items = faqs.filter((f) => f.topic === t.id); if (!items.length) return null; return (<div key={t.id} id={t.id}><SectionHeader eyebrow={t.label} title={t.label} /><FaqAccordion items={items} /></div>); })}
          </div>
        </div>
      </Section>
      <Section pad="sm"><CtaSection eyebrow="Still stuck?" title="Message the team." primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "All events", href: "/events" }} tone="light" /></Section>
    </>
  );
}
