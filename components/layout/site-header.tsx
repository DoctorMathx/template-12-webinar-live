"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Radio } from "lucide-react";
import { navItems } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 6);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-colors ${scrolled ? "bg-ink/95 backdrop-blur border-b border-line-dark" : "bg-transparent"}`}>
      <div className="container-x flex items-center justify-between h-[70px] text-white">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-[color:var(--accent)] flex items-center justify-center text-white"><Radio className="w-4 h-4" /></span>
          <span className="font-display font-bold text-[20px] tracking-tight">{siteConfig.brand.name}</span>
        </Link>
        <nav className="hidden lg:flex items-center">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href ?? "#"} className="px-3 py-2 text-[13.5px] text-white/70 hover:text-white transition-colors">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/events" className="hidden sm:inline-flex btn btn-outline-light btn-sm">All events</Link>
          <Link href="/events/pricing-playbook" className="hidden sm:inline-flex btn btn-accent btn-sm">Reserve seat</Link>
          <button onClick={() => setMobileOpen(true)} aria-label="Menu" className="lg:hidden p-2 -mr-2 text-white"><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[86%] max-w-[360px] bg-ink text-white flex flex-col border-l border-line-dark">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line-dark"><span className="font-display font-bold text-lg">{siteConfig.brand.name}</span><button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></button></div>
            <nav className="flex-1 overflow-y-auto px-2 py-3">{navItems.map((item) => (<Link key={item.label} href={item.href ?? "#"} onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-[15px] font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/5">{item.label}</Link>))}</nav>
            <div className="p-5 border-t border-line-dark space-y-2"><Link href="/events" onClick={() => setMobileOpen(false)} className="btn btn-outline-light w-full">All events</Link><Link href="/events/pricing-playbook" onClick={() => setMobileOpen(false)} className="btn btn-accent w-full">Reserve a seat</Link></div>
          </div>
        </div>
      )}
    </header>
  );
}
