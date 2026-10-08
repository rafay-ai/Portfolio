import type { Metadata } from "next";
import { Kalam, Libre_Franklin, Newsreader } from "next/font/google";
import "./globals.css";

const franklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdul Rafay | Deep Learning Engineer",
  description:
    "Portfolio of Abdul Rafay, a Deep Learning Engineer building production computer vision, multimodal OCR, and language-model systems. Also draws in ballpoint pen.",
  keywords: [
    "Abdul Rafay",
    "Deep Learning Engineer",
    "Computer Vision",
    "Multimodal OCR",
    "LLM Fine-tuning",
    "Karachi",
    "Ballpoint drawing",
  ],
  openGraph: {
    title: "Abdul Rafay | Deep Learning Engineer",
    description: "Production computer vision, multimodal OCR, and language-model systems.",
    type: "website",
  },
};

// Applies the saved theme before first paint so the page never flashes the wrong colours.
const themeScript = `try{var t=localStorage.getItem("portfolio-theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${franklin.variable} ${newsreader.variable} ${kalam.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
