import { redirect } from "next/navigation";
import { CarFront, MapPinned, RadioTower, Siren } from "lucide-react";
import { getStaffPrincipal } from "@/features/auth/authorization";
export default async function OperationsPortal({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const principal = await getStaffPrincipal(
    ["operations-manager"],
    "operations.dashboard.read",
  );
  if (!principal) redirect("/" + locale + "/login?next=operations");
  const cards = [
    [
      MapPinned,
      "Journey board",
      "Operational assignments and verified service states.",
    ],
    [
      CarFront,
      "Vendor coordination",
      "Driver, stay and local partner exception handling.",
    ],
    [
      RadioTower,
      "Service escalations",
      "Owned incidents with acknowledgement and hand-off.",
    ],
    [
      Siren,
      "Safety desk",
      "Severity-led response without invented live tracking.",
    ],
  ] as const;
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Operations Portal
      </p>
      <h1 className="mt-3 text-4xl font-black">Journey operations centre</h1>
      <p className="text-muted mt-4">
        No operational state is shown until a repository provides verified
        records.
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
