import { redirect } from "next/navigation";
import { BellRing, Filter, Languages, Megaphone } from "lucide-react";
import { getStaffPrincipal } from "@/features/auth/authorization";
export default async function CrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const principal = await getStaffPrincipal(
    ["marketing-manager"],
    "crm.dashboard.read",
  );
  if (!principal) redirect("/" + locale + "/login?next=crm");
  const cards = [
    [
      Filter,
      "Segments",
      "Purpose-limited audiences backed by consent and suppression rules.",
    ],
    [
      Megaphone,
      "Campaign drafts",
      "Draft-first workflow; creation never implies delivery.",
    ],
    [
      BellRing,
      "Reminders",
      "Booking, trip, refund and support events stay transactional.",
    ],
    [
      Languages,
      "Localised templates",
      "Hindi and English content without mixed-language fallbacks.",
    ],
  ] as const;
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        CRM Portal
      </p>
      <h1 className="mt-3 text-4xl font-black">Consent-aware communication</h1>
      <p className="text-muted mt-4">
        Promotional outreach requires marketing consent; push requires separate
        push consent.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {cards.map(([Icon, title, text]) => (
          <article key={title} className="rounded-2xl border bg-white p-6">
            <Icon className="text-primary-deep" />
            <h2 className="mt-4 text-xl font-black">{title}</h2>
            <p className="text-muted mt-3 text-sm">{text}</p>
            <p className="text-warning mt-4 text-xs font-bold uppercase">
              No connected records
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
