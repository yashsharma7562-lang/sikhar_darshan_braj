import { redirect } from "next/navigation";
import {
  Accessibility,
  CircleHelp,
  HandCoins,
  ShieldAlert,
} from "lucide-react";
import { getStaffPrincipal } from "@/features/auth/authorization";
export default async function SupportPortal({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const principal = await getStaffPrincipal(
    ["customer-support-agent"],
    "support.tickets.read",
  );
  if (!principal) redirect("/" + locale + "/login?next=support");
  const cards = [
    [
      CircleHelp,
      "Support queue",
      "Assigned cases, SLA state and customer replies.",
    ],
    [
      HandCoins,
      "Refund coordination",
      "Evidence-led hand-off to authorised finance staff.",
    ],
    [
      Accessibility,
      "Assistance",
      "Accessibility needs with minimum necessary personal data.",
    ],
    [
      ShieldAlert,
      "Safety hand-off",
      "Urgent escalation to the operations safety workflow.",
    ],
  ] as const;
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Support Portal
      </p>
      <h1 className="mt-3 text-4xl font-black">Customer care workspace</h1>
      <p className="text-muted mt-4">
        Cases follow explicit stages; financial and safety decisions remain
        permission-separated.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {cards.map(([Icon, title, text]) => (
          <article key={title} className="rounded-2xl border bg-white p-6">
            <Icon className="text-primary-deep" />
            <h2 className="mt-4 text-xl font-black">{title}</h2>
            <p className="text-muted mt-3 text-sm">{text}</p>
            <p className="text-warning mt-4 text-xs font-bold uppercase">
              Queue unavailable
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
