import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
