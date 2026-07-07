import Link from "next/link";
import { Radio } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { footerLinks } from "@/mock/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white border-t border-line-dark">
      <div className="container-x py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5"><span className="w-8 h-8 rounded-xl bg-[color:var(--accent)] flex items-center justify-center text-white"><Radio className="w-4 h-4" /></span><span className="font-display font-bold text-[20px]">{siteConfig.brand.name}</span></div>
            <p className="mt-4 text-[14.5px] text-white/60 max-w-sm leading-relaxed">{siteConfig.brand.tagline}</p>
            <form className="mt-6 flex gap-2 max-w-md"><input type="email" required placeholder="you@work.com" className="input input-dark text-[13px]" /><button className="btn btn-accent btn-sm">Notify me</button></form>
            <p className="mt-2 text-[12px] text-white/40">One email a week — the upcoming session &amp; a recap.</p>
          </div>
          <div><h4 className="eyebrow-light mb-4">Live</h4><ul className="space-y-2.5">{footerLinks.live.map((i) => (<li key={i.label}><Link href={i.href} className="text-[14px] text-white/60 hover:text-white">{i.label}</Link></li>))}</ul></div>
          <div><h4 className="eyebrow-light mb-4">Help</h4><ul className="space-y-2.5">{footerLinks.help.map((i) => (<li key={i.label}><Link href={i.href} className="text-[14px] text-white/60 hover:text-white">{i.label}</Link></li>))}</ul></div>
        </div>
        <div className="mt-12 pt-6 border-t border-line-dark flex flex-col md:flex-row justify-between gap-2">
          <p className="text-[12px] text-white/40">© {new Date().getFullYear()} {siteConfig.brand.name}. Built on FinStore.</p>
          <p className="text-[12px] text-white/40">{siteConfig.brand.city}</p>
        </div>
      </div>
    </footer>
  );
}
