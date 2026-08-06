import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSettings } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Central Institute of Buddhist Studies (CIBS) — Deemed to be University",
    template: "%s · CIBS Ladakh",
  },
  description:
    "The Central Institute of Buddhist Studies, Choglamsar, Leh — a Deemed to be University under the Ministry of Culture, Government of India, continuing the Nalanda tradition of learning in the Himalayas.",
  keywords: ["CIBS", "Buddhist Studies", "Ladakh", "Sowa Rigpa", "Deemed University", "Leh"],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const institute = await getSettings();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory">
        <SiteHeader institute={institute} />
        <main className="flex-1">{children}</main>
        <SiteFooter institute={institute} />
      </body>
    </html>
  );
}
