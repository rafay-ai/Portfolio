import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site";
import { profile } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Terms | Abdul Rafay",
};

export default function Terms() {
  return (
    <main id="top">
      <SiteHeader />
      <article className="shell prose">
        <p className="label">Last updated 8 October 2026</p>
        <h1>Terms of use</h1>
        <p>By using this site you agree to the short list below.</p>

        <h2>Drawings</h2>
        <p>
          All drawings shown here are my original work and remain my copyright. You are welcome to view and link to
          them. Please do not reproduce, sell, print, or use them to train or fine-tune generative models without my
          written permission. For prints or permission, email <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>

        <h2>Project descriptions</h2>
        <p>
          Project write-ups describe work done for employers and clients. Code, data, and model weights are not
          published here and remain with their owners. Figures such as accuracy are reported from my own evaluations
          and may differ on other data.
        </p>

        <h2>Résumé and text</h2>
        <p>You may download and share my CV for recruiting purposes. The rest of the text is mine; quote it with credit.</p>

        <h2>No warranty</h2>
        <p>
          The site is provided as is. Nothing here is professional advice, and I am not liable for decisions made on
          the basis of it.
        </p>

        <h2>Changes</h2>
        <p>These terms may change. The date at the top shows the latest version.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
