export type EventType = "workshop" | "masterclass" | "panel" | "ama";
export type EventCategory = "marketing" | "product" | "sales" | "leadership" | "money" | "creative";
export type EventStatus = "upcoming" | "live" | "replay";

export type LiveEvent = {
  id: string;
  title: string;
  slug: string;
  type: EventType;
  category: EventCategory;
  status: EventStatus;
  shortDescription: string;
  fullDescription?: string;
  price: number;                 // 0 = free
  cover: string;
  startsAt: string;              // ISO date
  duration: string;              // "90 min"
  presenter: string;
  presenterRole?: string;
  presenterAvatar?: string;
  seatsLeft?: number;
  totalSeats?: number;
  agenda: { time: string; title: string }[];
  outcomes: string[];
  whoFor: string[];
  includes: string[];
  featured?: boolean;
  flagship?: boolean;
};

export type Testimonial = { id: string; quote: string; name: string; role?: string; rating?: number };
export type Faq = { id: string; question: string; answer: string; topic?: string };
export type NavItem = { label: string; href?: string; children?: { label: string; href: string; description?: string }[] };
