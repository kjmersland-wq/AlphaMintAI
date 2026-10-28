import { CORMORANT_BOLD_BASE64 } from "./og-font-data";

// Cormorant Garamond Bold, inlined as base64 so image generation works without
// filesystem or network access (Cloudflare Workers has neither at request time).
export async function loadSerifFont(): Promise<ArrayBuffer> {
  const bytes = Uint8Array.from(atob(CORMORANT_BOLD_BASE64), (c) => c.charCodeAt(0));
  return bytes.buffer;
}

export const BRAND = {
  black: "#0B0B0C",
  gold: "#D4AF37",
} as const;
