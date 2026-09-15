import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdul Rafay | Deep Learning Engineer",
  description:
    "Portfolio of Abdul Rafay, a Deep Learning Engineer building production computer vision, multimodal OCR, and language-model systems.",
  keywords: [
    "Abdul Rafay",
    "Deep Learning Engineer",
    "Computer Vision",
    "Multimodal OCR",
    "LLM Fine-tuning",
    "Karachi",
  ],
  openGraph: {
    title: "Abdul Rafay | Deep Learning Engineer",
    description:
      "Production-grade computer vision, multimodal OCR, and language-model systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
