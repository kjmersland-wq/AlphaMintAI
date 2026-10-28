import { ImageResponse } from "next/og";
import { BRAND, loadSerifFont } from "@/lib/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen bookmark. iOS applies its own corner mask, so the artwork is
// full-bleed with the gold frame inset.
export default async function AppleIcon() {
  const font = await loadSerifFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.black,
        }}
      >
        <div
          style={{
            width: 148,
            height: 148,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `7px solid ${BRAND.gold}`,
            borderRadius: 24,
            color: BRAND.gold,
            fontFamily: "Cormorant",
            fontWeight: 700,
            fontSize: 92,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          AM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cormorant", data: font, weight: 700, style: "normal" }],
    },
  );
}
