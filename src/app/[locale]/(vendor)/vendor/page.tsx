import { redirect } from "next/navigation";
import {
  BarChart3,
  BedDouble,
  CalendarCheck,
  Car,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { getVendorPrincipal } from "@/features/vendors/authorization";
export default async function VendorDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const principal = await getVendorPrincipal("vendor.analytics.read");
  if (!principal) redirect("/" + locale + "/login?next=vendor");
  const cards = [
    [ShieldCheck, "Verification", "Verification records and review status."],
    [CreditCard, "Subscription", "Plan, billing period and access limits."],
    [BedDouble, "Hotel operations", "Properties, rooms, rates and inventory."],
    [Car, "Transport operations", "Vehicles, availability and assignments."],
    [CalendarCheck, "Bookings", "Organisation-scoped booking actions."],
    [
      BarChart3,
      "Analytics and payouts",
      "Transactional metrics and payout schedules.",
    ],
  ] as const;
  return (
    <section className="container-shell py-10 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Vendor SaaS
      </p>
      <h1 className="mt-3 text-4xl font-black">Vendor operations</h1>
      <p className="text-muted mt-4">
        Organisation: {principal.organisationId}
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
