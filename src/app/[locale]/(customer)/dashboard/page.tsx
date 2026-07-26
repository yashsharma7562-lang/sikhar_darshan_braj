import { redirect } from "next/navigation";
import {
  Bookmark,
  CalendarDays,
  HeartHandshake,
  PhoneCall,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { getCustomerSession } from "@/features/auth/session";
const cards = [
  [Bookmark, "Saved items", "No temples, stays, or journeys saved yet."],
  [
    CalendarDays,
    "Bookings",
    "No verified bookings are linked to this account.",
  ],
  [HeartHandshake, "Family sharing", "No family members have been added."],
  [PhoneCall, "Emergency contacts", "No emergency contacts have been added."],
  [
    UserRound,
    "Customer profile",
    "Profile details come only from your verified account.",
  ],
  [
    ShieldCheck,
    "Consent management",
    "Location, sharing, marketing, notifications, analytics, and accessibility consent default to off.",
  ],
] as const;
export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getCustomerSession();
  if (!session) redirect("/" + locale + "/login?next=dashboard");
  return (
    <section className="container-shell py-10 md:py-16">
      <header className="bg-peacock-deep flex flex-col gap-5 rounded-3xl p-7 text-white sm:flex-row sm:items-center sm:justify-between md:p-10">
        <div>
          <p className="text-soft-gold text-sm font-bold tracking-widest uppercase">
            Private customer dashboard
          </p>
          <h1 className="mt-2 text-3xl font-black">
            Namaste, {session.name ?? "traveller"}
          </h1>
          <p className="mt-2 text-sm text-white/75">
            Only records belonging to your verified Firebase identity can appear
            here.
          </p>
        </div>
        <LogoutButton locale={locale} />
      </header>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(([Icon, title, empty]) => (
          <article key={title} className="rounded-2xl border bg-white p-6">
            <Icon className="text-primary-deep" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-black">{title}</h2>
            <p className="text-muted mt-3 text-sm">{empty}</p>
          </article>
        ))}
      </div>
      <p className="bg-sand text-muted mt-6 rounded-xl p-4 text-sm">
        Empty states are intentional. This dashboard never manufactures
        bookings, saved items, contacts, or consent.
      </p>
    </section>
  );
}
