import {
  Accessibility,
  CalendarDays,
  Check,
  Footprints,
  IndianRupee,
  MapPin,
  X,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { packageRepository } from "@/features/packages/repository";
import { formatInr } from "@/features/stays/pricing";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await packageRepository.getBySlug(slug);
  return item ? { title: item.name } : {};
}
export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await packageRepository.getBySlug(slug);
  if (!item || item.verificationStatus !== "verified") notFound();
  return (
    <>
      <section className="bg-charcoal border-b py-14 text-white">
        <div className="container-shell">
          <p className="text-soft-gold text-sm font-extrabold tracking-[.2em] uppercase">
            Verified yatra package
          </p>
          <h1 className="mt-3 text-4xl font-black">{item.name}</h1>
          <p className="mt-4 flex items-center gap-2 text-white/65">
            <CalendarDays size={17} />
            {item.durationDays} days • {item.destinationSlugs.join(" • ")}
          </p>
        </div>
      </section>
      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_21rem]">
        <main className="space-y-6">
          <Panel title="Route and itinerary">
            <p className="text-muted text-sm leading-6">
              Day-wise operational details appear only after temple schedules,
              travel durations and service inventory are verified.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.destinationSlugs.map((place) => (
                <span
                  key={place}
                  className="bg-sand inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold"
                >
                  <MapPin size={15} />
                  {place}
                </span>
              ))}
            </div>
          </Panel>
          <Panel title="Physical effort">
            <div className="flex flex-wrap gap-2">
              {item.effortTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-peacock/10 text-peacock-deep inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold"
                >
                  <Footprints size={15} />
                  {tag.replaceAll("-", " ")}
                </span>
              ))}
            </div>
          </Panel>
          <div className="grid gap-5 sm:grid-cols-2">
            <Panel title="Included">
              {item.inclusions.map((entry) => (
                <p key={entry} className="mt-2 flex gap-2 text-sm">
                  <Check className="text-success" size={17} />
                  {entry}
                </p>
              ))}
            </Panel>
            <Panel title="Not included">
              {item.exclusions.map((entry) => (
                <p key={entry} className="mt-2 flex gap-2 text-sm">
                  <X className="text-error" size={17} />
                  {entry}
                </p>
              ))}
            </Panel>
          </div>
          <Panel title="Verified departures">
            {item.departures.length ? (
              item.departures.map((departure) => (
                <div key={departure.id}>{departure.startsOn}</div>
              ))
            ) : (
              <p className="text-muted text-sm">
                No verified departure dates are published.
              </p>
            )}
          </Panel>
        </main>
        <aside>
          <div className="sticky top-24 rounded-2xl border bg-white p-5">
            <Accessibility className="text-peacock" />
            <h2 className="mt-3 font-black">Review suitability first</h2>
            <p className="text-muted mt-2 text-sm leading-6">
              Accessibility requests require provider confirmation and are never
              guaranteed from a filter alone.
            </p>
            <div className="mt-5 border-t pt-4">
              <span className="text-muted text-xs font-bold">
                Starting price
              </span>
              <strong className="mt-1 block text-xl">
                {item.basePriceMinor === null
                  ? "Not published"
                  : formatInr(item.basePriceMinor)}
              </strong>
            </div>
            <button
              disabled
              className="bg-primary mt-5 min-h-12 w-full rounded-xl font-extrabold text-white disabled:opacity-50"
            >
              <IndianRupee size={17} className="mr-2 inline" />
              Select a departure
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border bg-white p-6">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
