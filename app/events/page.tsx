import type { Metadata } from "next";
import { Suspense } from "react";
import { EventsIndex } from "./events-index";

export const metadata: Metadata = { title: "Live events & replays" };

export default function EventsPage() {
  return <Suspense fallback={null}><EventsIndex /></Suspense>;
}
