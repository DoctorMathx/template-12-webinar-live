"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-[color:var(--line)] border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between text-left py-6 gap-6 group"
              aria-expanded={isOpen}
            >
              <span className="font-display text-[17px] md:text-[19px] font-medium tracking-tight text-[color:var(--ink)] leading-snug">
                {item.question}
              </span>
              <span className="mt-1 shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-[color:var(--ink)] group-hover:bg-[color:var(--ink)] group-hover:text-white transition-colors">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 pr-14 -mt-2 fade-up">
                <p className="text-[15px] leading-relaxed text-[color:var(--charcoal)]">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
