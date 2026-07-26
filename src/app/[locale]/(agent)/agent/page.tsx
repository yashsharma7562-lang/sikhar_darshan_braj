import { redirect } from "next/navigation";
import { Boxes, Calculator, Contact, UsersRound } from "lucide-react";
import { getPortalPrincipal } from "@/features/auth/authorization";
export default async function AgentPortal({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const principal = await getPortalPrincipal(
    "travel-agent",
    "agent.groups.read",
  );
  if (!principal) redirect("/" + locale + "/login?next=agent");
  const cards = [
    [Contact, "CRM", "Consent-backed enquiries and lead stages."],
    [
      Calculator,
      "Group quotations",
      "Server-verified rates, taxes and validity.",
    ],
    [
      Boxes,
      "Package builder",
      "Unpublished drafts with effort and inclusion details.",
    ],
    [
      UsersRound,
      "Group journeys",
      "Traveller counts and accessibility planning.",
    ],
  ] as const;
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Travel Agent Portal
      </p>
      <h1 className="mt-3 text-4xl font-black">Group journey workspace</h1>
      <p className="text-muted mt-4">
        Organisation: {principal.organisationId}
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
