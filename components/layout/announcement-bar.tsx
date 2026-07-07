import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[color:var(--ink)] text-white text-[13px]">
      <div className="container-x flex items-center justify-between gap-6 py-2.5">
        <p className="tracking-tight text-white/90">
          <span className="hidden sm:inline text-white/60 mr-2">New cohort · </span>
          The Creator Business Blueprint · Spring intake now open
        </p>
        <Link
          href="/courses/creator-business-blueprint"
          className="inline-flex items-center gap-1.5 font-medium text-white hover:opacity-80 transition-opacity"
        >
          <span className="hidden sm:inline">Reserve your seat</span>
          <span className="sm:hidden">Reserve</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
