import { Accessibility, CircleHelp, LifeBuoy, ShieldAlert } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function HelpPage() {
  const topics = [
    [
      CircleHelp,
      "Planning and bookings",
      "Sign in to review your journey records and contact support about a specific booking.",
    ],
    [
      Accessibility,
      "Accessibility assistance",
      "Review mobility, senior-friendly and caregiver planning options before you travel.",
    ],
    [
      LifeBuoy,
      "Refund and service help",
      "Authenticated requests preserve the booking timeline and avoid exposing personal details.",
    ],
    [
      ShieldAlert,
      "Urgent safety concerns",
      "Use local emergency services first when there is immediate danger. Platform support is not an emergency-service replacement.",
    ],
  ] as const;

  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Customer help
      </p>
      <h1 className="mt-3 text-4xl font-black">
        How can we support your yatra?
      </h1>
      <p className="text-muted mt-4 max-w-3xl">
        Find the right help path without entering personal, payment or identity
        details on a public page.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {topics.map(([Icon, title, text]) => (
          <article key={title} className="rounded-2xl border bg-white p-6">
            <Icon className="text-primary-deep" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-black">{title}</h2>
            <p className="text-muted mt-3 text-sm">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/login"
          className="bg-peacock-deep inline-flex min-h-12 items-center rounded-xl px-5 font-bold text-white"
        >
          Sign in for booking support
        </Link>
        <Link
          href="/accessibility"
          className="inline-flex min-h-12 items-center rounded-xl border bg-white px-5 font-bold"
        >
          Accessibility information
        </Link>
      </div>
    </section>
  );
}
