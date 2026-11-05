import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

import { ogImage } from "@/lib/site";

// Rendered once at build time and written to /og-image.png in the static export.
// (A route with a real .png extension so GitHub Pages serves it as image/png.)
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91,140,255,0.22), #06080d 70%)",
          color: "#e9edf4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1.5px solid rgba(148,163,184,0.3)",
              background: "#0f141f",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9ba6b9" }}>{profile.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05, maxWidth: 980 }}>
            {profile.headline}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#84a8ff" }}>{profile.title}</div>
        </div>
      </div>
    ),
    { width: ogImage.width, height: ogImage.height },
  );
}
