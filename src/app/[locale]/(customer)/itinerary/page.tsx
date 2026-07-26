import { redirect } from "next/navigation";
import {
  BrainCircuit,
  Download,
  MapPinned,
  Share2,
  WifiOff,
} from "lucide-react";
import { getCustomerSession } from "@/features/auth/session";
export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await getCustomerSession()))
    redirect("/" + locale + "/login?next=itinerary");
  const cards = [
    [
      MapPinned,
      "Verified routing",
      "Distances and durations appear only from a configured Google Routes response.",
    ],
    [
      BrainCircuit,
      "AI assistance",
      "Suggestions preserve warnings and require review before saving.",
    ],
    [
      WifiOff,
      "Offline itinerary",
      "Snapshots include their last sync time and a stale-data warning.",
    ],
    [
      Download,
      "PDF export",
      "Generate a printable plan clearly labelled as an itinerary, not a booking voucher.",
    ],
    [
      Share2,
      "Private sharing",
      "Expiring, revocable, view-only links use hashed random tokens.",
    ],
  ] as const;
  return (
    <section className="container-shell py-10 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Maps and itinerary
      </p>
      <h1 className="mt-3 text-4xl font-black">Your journey plan</h1>
      <p className="text-muted mt-4 max-w-3xl">
        Plan routes without presenting unverified travel times, temple
        schedules, or accessibility as fact.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(([Icon, title, text]) => (
          <article key={title} className="rounded-2xl border bg-white p-6">
            <Icon className="text-primary-deep" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-black">{title}</h2>
            <p className="text-muted mt-3 text-sm">{text}</p>
          </article>
        ))}
      </div>
      <p className="bg-sand mt-6 rounded-xl p-4 text-sm">
        No saved itinerary is connected to this account. Route, export, offline,
        and sharing actions remain unavailable.
      </p>
    </section>
  );
}
