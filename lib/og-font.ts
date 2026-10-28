import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Cormorant Garamond Bold, bundled in the repo so image generation never depends
// on a network fetch to Google Fonts. The icon and OG routes are prerendered at
// build time, so this file read happens during `next build`, not per request.
export async function loadSerifFont(): Promise<ArrayBuffer> {
  const file = await readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Bold.woff"));
  return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
}

export const BRAND = {
  black: "#0B0B0C",
  gold: "#D4AF37",
} as const;
