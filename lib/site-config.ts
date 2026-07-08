export const siteConfig = {
  brand: {
    name: "Kola Live",
    tagline: "Live workshops for people who actually take notes.",
    domain: "kola.live",
    email: "hello@kola.live",
    whatsapp: "+234 700 000 0000",
    city: "Broadcasting from Lagos",
    social: { instagram: "https://instagram.com/kolalive", twitter: "https://twitter.com/kolalive", youtube: "https://youtube.com/@kolalive", linkedin: "https://linkedin.com/company/kolalive" },
  },
  host: {
    name: "Yemi Adeleke",
    role: "Host & lead facilitator",
    portrait: "/img/hero-portrait.jpg",
    shortBio: "I run one live workshop a week for African founders, marketers and operators. Same day, same time, always practical.",
    metric: "142 live sessions · 38,400 attendees",
  },
  hero: {
    tag: "Next live session · Thursday 6:00 PM WAT",
    primaryCta: { label: "Reserve your seat", href: "/events/pricing-playbook" },
    secondaryCta: { label: "See upcoming events", href: "/events" },
  },
  commerce: { currency: "₦", trust: ["Instant Zoom link", "Replay + slides included", "Cancel any time"] },
} as const;
