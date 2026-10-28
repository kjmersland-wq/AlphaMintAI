import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — AlphaMint AI",
  description: "How AlphaMint AI collects, uses and protects your personal data.",
};

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_PRIVACY_EMAIL ?? "privacy@alphamint.ai";
const LAST_UPDATED = "28 October 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-heading text-2xl font-semibold text-gold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.25em] text-gold-soft hover:text-gold"
      >
        ← Back to AlphaMint AI
      </Link>

      <h1 className="font-heading mt-6 text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-1 text-sm text-muted">
        Personvernerklæring · Last updated {LAST_UPDATED}
      </p>

      <Section title="1. Who we are">
        <p>
          AlphaMint AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the controller of the personal
          data described in this policy. You can reach us about any privacy matter at{" "}
          <a className="text-gold underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title="2. What we collect">
        <p>
          When you join our private waitlist we collect your email address and the time
          you signed up. We do not ask for any other personal information at this stage.
        </p>
      </Section>

      <Section title="3. Why we collect it">
        <p>
          We use your email solely to send you early-access and launch notifications about
          AlphaMint AI. We do not use it for any other purpose, and we do not sell, rent or
          trade your email address to anyone.
        </p>
        <p>
          Legal basis (GDPR Art. 6(1)(a)): your consent, given when you submit the waitlist
          form. You may withdraw consent at any time.
        </p>
      </Section>

      <Section title="4. Who processes your data">
        <p>
          Our infrastructure and database providers process your email on our behalf under
          data processing terms. They may not use it for their own purposes. Where data is
          transferred outside the EEA, we rely on appropriate safeguards such as Standard
          Contractual Clauses.
        </p>
      </Section>

      <Section title="5. How long we keep it">
        <p>
          We keep your email until the early-access programme ends or until you ask us to
          delete it, whichever is sooner.
        </p>
      </Section>

      <Section title="6. Your rights">
        <p>
          Under the GDPR you may request access to, correction of, or deletion of your data,
          restrict or object to processing, request a portable copy, and withdraw consent at
          any time. To exercise any right, including deletion, email{" "}
          <a className="text-gold underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{" "}
          and we will respond within 30 days.
        </p>
        <p>
          You also have the right to lodge a complaint with your national supervisory
          authority, for example Datatilsynet (Norway) or UODO (Poland).
        </p>
      </Section>

      <Section title="7. Security">
        <p>
          Waitlist data is stored in an access-controlled database that is not publicly
          readable, and is transmitted over encrypted connections.
        </p>
      </Section>

      <Section title="8. Not financial advice">
        <p>
          AlphaMint AI content is for educational purposes and general market information
          only and does not constitute financial advice.
        </p>
      </Section>
    </main>
  );
}
