import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#14102A";
const ACCENT = "#7A5AF8";
const PAPER = "#F5F2FB";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent rail */}
        <div style={{ width: 20, background: ACCENT }} />

        {/* Dot pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${INK}18 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
            opacity: 0.55,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px 90px",
            flex: 1,
            position: "relative",
            color: INK,
          }}
        >
          {/* Top badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 10,
                background: INK,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              {siteConfig.brand.name.charAt(0)}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 4,
                color: INK,
                opacity: 0.65,
              }}
            >
              {siteConfig.brand.name}
            </div>
          </div>

          {/* Middle — tagline as the headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 76,
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: -2,
                color: INK,
                maxWidth: 960,
              }}
            >
              {siteConfig.brand.tagline}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 22,
                color: INK,
                opacity: 0.7,
              }}
            >
              <span
                style={{
                  padding: "8px 16px",
                  background: ACCENT,
                  color: "#fff",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {siteConfig.brand.city}
              </span>
              <span>·</span>
              <span style={{ fontWeight: 500 }}>{siteConfig.brand.domain}</span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 16,
              color: INK,
              opacity: 0.55,
            }}
          >
            <div style={{ letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>
              Built on FinStore
            </div>
            <div style={{ letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>
              finstore.africa
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
