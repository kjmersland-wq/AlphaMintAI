import { ImageResponse } from "next/og";
import { BRAND, loadSerifFont } from "@/lib/og-font";

export const alt = "AlphaMint AI — Institutional-Grade AI Investment Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRID = "rgba(212, 175, 55, 0.07)";

export default async function OpengraphImage() {
  const font = await loadSerifFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: BRAND.black,
          // Faint gold grid: two crossed 1px-line gradients on a 60px tile.
          backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          color: "#ECECEC",
          fontFamily: "Cormorant",
        }}
      >
        {/* Inset gold frame */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            display: "flex",
            border: "1px solid rgba(212, 175, 55, 0.45)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 118,
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: BRAND.gold,
            textTransform: "uppercase",
            // Offset the trailing letter-space so the wordmark is optically centred.
            paddingLeft: "0.16em",
          }}
        >
          AlphaMint AI
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            padding: "14px 34px",
            border: "1px solid rgba(212, 175, 55, 0.6)",
            borderRadius: 999,
            background: "rgba(26, 26, 30, 0.85)",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ECECEC",
          }}
        >
          Institutional-Grade AI Investment Intelligence
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 62,
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#8D8D96",
          }}
        >
          Invite-Only Early Access
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cormorant", data: font, weight: 700, style: "normal" }],
    },
  );
}
