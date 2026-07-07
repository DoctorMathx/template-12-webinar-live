import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faqs } from "@/mock/faqs";
import { siteConfig } from "@/lib/site-config";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink text-white -mt-[70px] pt-[70px] relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" />
        <div className="container-x py-16 md:py-20 max-w-4xl relative">
          <div className="chip chip-live">Contact</div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.02] mt-6">Say hello.</h1>
          <p className="text-lg text-white/70 mt-5 max-w-2xl">Ticket questions, corporate seats, sponsorships, or a note about a session. We reply within one business day.</p>
        </div>
      </section>

      <Section pad="md">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <Row icon={Mail} label="Email" value={siteConfig.brand.email} href={`mailto:${siteConfig.brand.email}`} />
            <Row icon={MessageCircle} label="WhatsApp" value={siteConfig.brand.whatsapp} href={`https://wa.me/${siteConfig.brand.whatsapp.replace(/\D/g, "")}`} />
            <Row icon={MapPin} label="Broadcasting from" value={siteConfig.brand.city} />
            <Row icon={Clock} label="Reply time" value="Within one business day" />
          </div>
          <div className="lg:col-span-7"><ContactForm /></div>
        </div>
      </Section>

      <Section tone="paper" pad="md">
        <div className="grid lg:grid-cols-12 gap-12"><div className="lg:col-span-5"><div className="eyebrow">Quick answers</div><h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mt-3">Might help first.</h2></div><div className="lg:col-span-7"><FaqAccordion items={faqs.slice(0, 5)} /></div></div>
      </Section>
    </>
  );
}

function Row({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const c = (<><div className="w-11 h-11 rounded-xl bg-paper flex items-center justify-center shrink-0"><Icon className="w-5 h-5" /></div><div><div className="text-[12px] muted">{label}</div><div className="text-[15.5px] font-medium">{value}</div></div></>);
  return href ? <a href={href} className="flex items-center gap-4 hover:opacity-90">{c}</a> : <div className="flex items-center gap-4">{c}</div>;
}
