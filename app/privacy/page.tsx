import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site";
import { profile } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Privacy | Abdul Rafay",
};

export default function Privacy() {
  return (
    <main id="top">
      <SiteHeader />
      <article className="shell prose">
        <p className="label">Last updated 8 October 2026</p>
        <h1>Privacy</h1>
        <p>This is a personal portfolio. It is small, and so is what it knows about you.</p>

        <h2>What this site stores</h2>
        <p>
          If you switch between the light and dark theme, your choice is saved in your own browser&apos;s local
          storage under the key <code>portfolio-theme</code>. It never leaves your device and you can clear it at any
          time from your browser settings.
        </p>

        <h2>What this site does not do</h2>
        <p>
          There are no analytics scripts, advertising trackers, cookies set by me, contact forms, or accounts. Fonts are
          served from this site&apos;s own domain at build time, so viewing a page does not ping a third-party font
          service.
        </p>

        <h2>Hosting</h2>
        <p>
          Like any website, the hosting provider receives standard request information such as your IP address and
          browser type in order to deliver pages. I do not use those logs to identify visitors.
        </p>

        <h2>If you email me</h2>
        <p>
          Writing to <a href={`mailto:${profile.email}`}>{profile.email}</a> means I receive your address and whatever
          you send. I use it only to reply and do not share it or add you to any list. Ask and I will delete our
          conversation.
        </p>

        <h2>External links</h2>
        <p>Links to GitHub and LinkedIn take you to sites with their own privacy policies.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
