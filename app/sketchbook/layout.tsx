import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sketchbook | Abdul Rafay",
  description: "Ballpoint drawings by Abdul Rafay, one page at a time.",
};

export default function SketchbookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
