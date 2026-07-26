import { redirect } from "next/navigation";
import {
  BookOpenCheck,
  Building2,
  CircleDollarSign,
  FileClock,
  Users,
} from "lucide-react";
import { getStaffPrincipal } from "@/features/auth/authorization";
export default async function AdminPortal({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const principal = await getStaffPrincipal(
    ["super-admin", "admin"],
    "admin.dashboard.read",
  );
  if (!principal) redirect("/" + locale + "/login?next=admin");
  const cards = [
    [Users, "Users", "Identity, roles and consent-aware account controls."],
    [
      Building2,
      "Vendors",
      "Verification, compliance and organisation controls.",
    ],
    [BookOpenCheck, "Bookings", "Booking exceptions and service coordination."],
    [
      CircleDollarSign,
      "Finance",
      "Refund, payout and reconciliation oversight.",
    ],
    [
      FileClock,
      "Content & audit",
      "Approvals and append-only critical action history.",
    ],
  ] as const;
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Admin Portal
      </p>
      <h1 className="mt-3 text-4xl font-black">Platform control centre</h1>
      <p className="text-muted mt-4">
        Permission-scoped actions require a reason and audit record.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
