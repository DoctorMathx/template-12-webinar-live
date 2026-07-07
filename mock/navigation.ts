import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "Upcoming events", href: "/events" },
  { label: "Replays", href: "/events?status=replay" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  live: [
    { label: "Upcoming events", href: "/events" },
    { label: "Replays", href: "/events?status=replay" },
    { label: "Season pass", href: "/events" },
    { label: "Corporate seats", href: "/contact" },
  ],
  help: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Refunds", href: "/faq" },
    { label: "Sponsorships", href: "/contact" },
  ],
};
