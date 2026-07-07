"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { flagshipEvent } from "@/mock/products";
import { siteConfig } from "@/lib/site-config";
import { formatEventDate, formatPrice } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, ShieldCheck, Tag, Zap } from "lucide-react";
import { Countdown } from "@/components/ui/countdown";

export function RegisterClient() {
  const router = useRouter();
  const e = flagshipEvent();
  const d = formatEventDate(e.startsAt);
  const [seats, setSeats] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = e.price * seats;
  const discount = applied === "LIVE10" ? Math.round(subtotal * 0.1) : (seats >= 3 ? Math.round(subtotal * 0.2) : 0);
  const total = subtotal - discount;

  const submit = (evt: React.FormEvent) => { evt.preventDefault(); setSubmitting(true); setTimeout(() => router.push("/thank-you"), 700); };

  return (
    <div className="bg-paper min-h-screen">
      <div className="container-x py-10 md:py-14">
        <Link href="/events" className="inline-flex items-center gap-2 text-[13.5px] muted hover:text-[color:var(--ink)]"><ArrowLeft className="w-4 h-4" /> All events</Link>

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          <form onSubmit={submit} className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
              <h1 className="font-display text-3xl md:text-[34px] font-extrabold tracking-tight">Reserve your seat</h1>
              <p className="text-[14px] muted mt-1">You&apos;ll get your Zoom link and calendar invite within a minute of paying.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field id="name" label="Full name" required />
                <Field id="email" label="Email" type="email" required />
                <Field id="company" label="Company / role" />
                <div><label className="label" htmlFor="tz">Timezone</label><select id="tz" className="input mt-1.5" defaultValue="WAT">{["WAT (Lagos)", "EAT (Nairobi)", "SAST (Johannesburg)", "GMT (London)", "EST (New York)", "PST (Los Angeles)"].map((tz) => <option key={tz}>{tz}</option>)}</select></div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
              <h2 className="font-display text-xl font-bold">How many seats?</h2>
              <p className="text-[13px] muted mt-1">Team of 3+ gets 20% off automatically.</p>
              <div className="mt-4 flex items-center gap-3">
                {[1, 2, 3, 5, 10].map((n) => (
                  <button key={n} type="button" onClick={() => setSeats(n)} className={`px-4 py-2.5 rounded-xl border text-[14px] font-medium transition ${seats === n ? "border-[color:var(--ink)] bg-canvas" : "border-line hover:border-[color:var(--ink)]"}`}>{n}</button>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
              <h2 className="font-display text-xl font-bold">Payment</h2>
              <div className="mt-5 grid sm:grid-cols-3 gap-2">
                {["Card", "Bank transfer", "USSD"].map((m, i) => (
                  <label key={m} className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer ${i === 0 ? "border-[color:var(--ink)] bg-canvas" : "border-line hover:border-[color:var(--ink)]"}`}>
                    <input type="radio" name="method" defaultChecked={i === 0} className="accent-black" />
                    <span className="text-[14px] font-medium">{m}</span>
                  </label>
                ))}
              </div>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <Field id="card" label="Card number" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-4"><Field id="exp" label="Expiry" placeholder="MM / YY" /><Field id="cvc" label="CVC" placeholder="123" /></div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
              <label htmlFor="agree" className="text-[13.5px] muted leading-relaxed"><input id="agree" type="checkbox" required defaultChecked className="accent-black mr-2" />I agree to the <Link href="/faq" className="underline underline-offset-4 text-[color:var(--ink)]">refund policy</Link>.</label>
              <button disabled={submitting} className="btn btn-accent btn-lg w-full mt-6">{submitting ? "Processing…" : `Reserve ${seats} seat${seats > 1 ? "s" : ""} — ${formatPrice(total)}`}</button>
            </div>
          </form>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
                <h2 className="font-display text-lg font-bold">Your session</h2>
                <div className="mt-5 flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-canvas border border-line shrink-0"><Image src={e.cover} alt="" fill sizes="80px" className="object-cover" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] uppercase tracking-[.18em] muted">{e.type}</div>
                    <div className="text-[14.5px] font-medium leading-snug mt-1">{e.title}</div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-line space-y-3 text-[14px]">
                  <div className="flex items-center gap-3"><Calendar className="w-4 h-4 muted" />{d.weekday} {d.month} {d.day}</div>
                  <div className="flex items-center gap-3"><Clock className="w-4 h-4 muted" />{d.time} · {e.duration}</div>
                </div>
                <div className="mt-5"><Countdown target={e.startsAt} /></div>
                <div className="mt-5 pt-5 border-t border-line space-y-2 text-[14px]">
                  <Row label={`Seat × ${seats}`} value={formatPrice(subtotal)} />
                  {discount > 0 && <Row label={applied === "LIVE10" ? "Coupon (LIVE10)" : "Team discount (20%)"} value={`− ${formatPrice(discount)}`} accent />}
                  <Row label="Total" value={formatPrice(total)} bold />
                </div>
                <div className="mt-5 flex gap-2">
                  <div className="relative flex-1"><Tag className="w-3.5 h-3.5 muted absolute left-3 top-1/2 -translate-y-1/2" /><input value={coupon} onChange={(ev) => setCoupon(ev.target.value)} placeholder="Coupon" className="input py-2 pl-8 text-[13px]" /></div>
                  <button type="button" onClick={() => setApplied(coupon.trim().toUpperCase() || null)} className="btn btn-outline btn-sm">Apply</button>
                </div>
                {applied && applied !== "LIVE10" && <p className="mt-2 text-[12.5px] muted">Try <span className="font-medium text-[color:var(--ink)]">LIVE10</span> for 10% off.</p>}
              </div>
              <div className="p-5 rounded-3xl bg-white border border-line flex items-start gap-3"><Zap className="w-4 h-4 mt-1 text-[color:var(--accent-ink)]" /><div><div className="text-[14px] font-medium">Zoom link + calendar invite</div><div className="text-[12.5px] muted mt-0.5">Delivered within a minute.</div></div></div>
              <div className="p-5 rounded-3xl bg-white border border-line flex items-start gap-3"><ShieldCheck className="w-4 h-4 mt-1 text-[color:var(--accent-ink)]" /><div><div className="text-[14px] font-medium">Cancel anytime</div><div className="text-[12.5px] muted mt-0.5">Refund up to 24 hours before the session.</div></div></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, type = "text", placeholder, required }: { id: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return <div><label className="label" htmlFor={id}>{label}</label><input id={id} type={type} required={required} placeholder={placeholder} className="input mt-1.5" /></div>;
}
function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return <div className="flex items-center justify-between"><span className={bold ? "font-medium" : "muted"}>{label}</span><span className={`${bold ? "font-display text-lg font-bold" : ""} tabular-nums ${accent ? "text-[color:var(--accent)]" : ""}`}>{value}</span></div>;
}
