import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { CtaSection } from "@/components/ui/cta-section";
import { siteConfig } from "@/lib/site-config";
import { proofStats } from "@/mock/testimonials";

export const metadata: Metadata = { title: "About" };

const PRINCIPLES = [
  { title: "One session a week", body: "Every Thursday, 6pm WAT. Consistent enough that you can plan your calendar around it." },
  { title: "No filler", body: "Every session is 60 or 90 minutes. We ship what we promised and stop when we should." },
  { title: "Real Q&A", body: "The last 20 minutes are always live audience questions. We answer them. Every time." },
  { title: "Small production, real practitioners", body: "No polished-till-boring keynotes. Working founders sharing what they actually did." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-white -mt-[70px] pt-[70px] relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" />
        <div className="container-x py-16 md:py-24 max-w-4xl relative">
          <div className="chip chip-live">Live · every Thursday</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[80px] font-extrabold tracking-tight leading-[1.02] mt-6">A workshop series, held together by <span className="italic text-[color:var(--accent)]">consistency.</span></h1>
          <p className="text-lg text-white/70 mt-6 max-w-2xl">{siteConfig.brand.name} is a live workshop series for African founders, marketers and operators. One session a week, since 2024.</p>
        </div>
      </section>

      <Section pad="lg">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5"><div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-canvas border border-line"><Image src={siteConfig.host.portrait} alt={siteConfig.host.name} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" /></div></div>
          <div className="lg:col-span-7">
            <div className="eyebrow">Your host</div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mt-3">{siteConfig.host.name}</h2>
            <p className="text-[15px] muted mt-2">{siteConfig.host.role}</p>
            <div className="mt-6 space-y-4 max-w-xl text-[16px] leading-relaxed text-[color:var(--charcoal)]">
              <p>I started Kola Live in 2024 with one goal: a single live workshop a week, done well, on Thursdays at 6pm WAT.</p>
              <p>142 sessions later, we&apos;re still that. One session, one topic, one host or one guest, and a real Q&amp;A at the end.</p>
              <p>I bring in guest facilitators when it makes the session sharper. But I&apos;m in the room every week.</p>
            </div>
          </div>
        </div>
      </Section>

      <div className="container-x"><div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-canvas border border-line"><Image src="/img/hero-scene.jpg" alt="Behind the scenes" fill sizes="1200px" className="object-cover" /></div></div>

      <Section tone="paper" pad="lg">
        <SectionHeader eyebrow="Principles" title="Four things we never break." />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {PRINCIPLES.map((v, i) => (<div key={v.title} className="card p-7"><div className="font-display text-3xl font-extrabold tabular-nums text-[color:var(--accent-ink)]">{String(i + 1).padStart(2, "0")}</div><h3 className="font-display text-xl font-bold mt-3">{v.title}</h3><p className="text-[15px] text-[color:var(--charcoal)] leading-relaxed mt-2">{v.body}</p></div>))}
        </div>
      </Section>

      <Section pad="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          {proofStats.map((s) => (<div key={s.label} className="border-t border-line pt-4"><div className="font-display text-3xl font-extrabold tabular-nums">{s.value}</div><div className="text-[12px] muted mt-1">{s.label}</div></div>))}
        </div>
      </Section>

      <Section pad="sm"><CtaSection eyebrow="Ready" title="Grab your seat for Thursday." primary={{ label: "Reserve a seat", href: "/events/pricing-playbook" }} secondary={{ label: "See all events", href: "/events" }} tone="light" /></Section>
    </>
  );
}
