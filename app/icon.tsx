import { ImageResponse } from "next/og";
import { BRAND, loadSerifFont } from "@/lib/og-font";

export const contentType = "image/png";

// 32px: browser favicon. 192px: Android/PWA home screen (referenced by manifest).
export function generateImageMetadata() {
  return [
    { id: "32", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" },
  ];
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const px = Number(await id);
  const font = await loadSerifFont();

  const border = Math.max(1, Math.round(px * 0.045));
  const inset = Math.round(px * 0.06);
  const radius = Math.round(px * 0.18);

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
            width: px - inset * 2,
            height: px - inset * 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `${border}px solid ${BRAND.gold}`,
            borderRadius: radius,
            color: BRAND.gold,
            fontFamily: "Cormorant",
            fontWeight: 700,
            fontSize: Math.round(px * 0.52),
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          AM
        </div>
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Cormorant", data: font, weight: 700, style: "normal" }],
    },
  );
}
