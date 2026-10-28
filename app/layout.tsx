import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { defaultLocale, getDictionary } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Exclusive AI-driven market insights for members. Educational content only; not financial advice.";

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image URLs to absolute ones for social crawlers.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://alphamintai.com"),
  title: "AlphaMint AI — AI Investment Intelligence",
  description,
  openGraph: {
    title: "AlphaMint AI",
    description: "Institutional-Grade AI Investment Intelligence. Invite-Only Early Access.",
    siteName: "AlphaMint AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaMint AI",
    description: "Institutional-Grade AI Investment Intelligence. Invite-Only Early Access.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={defaultLocale}
      className={`${inter.variable} ${cormorant.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <I18nProvider locale={defaultLocale} dictionary={getDictionary(defaultLocale)}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
