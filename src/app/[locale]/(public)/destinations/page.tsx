import { ArrowRight, Compass, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { templeRepository } from "@/features/temples/repository";
export const metadata: Metadata = {
  title: "Braj Destinations",
  description:
    "Explore destination-based pilgrimage planning across the Braj region.",
};
export default async function DestinationsPage() {
  const destinations = await templeRepository.listDestinations();
  return (
    <>
      <section className="bg-peacock-deep border-b py-16 text-white">
        <div className="container-shell">
          <p className="text-soft-gold text-sm font-extrabold tracking-[.2em] uppercase">
            Explore Braj
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black sm:text-5xl">
            Build your journey around connected destinations.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Understand each stop, nearby places and the temple profiles
            available for verification-aware planning.
          </p>
        </div>
      </section>
      <div className="container-shell py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination.slug}
              className="flex flex-col rounded-[1.5rem] border bg-white p-6"
            >
              <span className="bg-sand text-primary-deep grid size-12 place-items-center rounded-2xl">
                <MapPin />
              </span>
              <p className="text-muted mt-5 text-xs font-extrabold tracking-[.18em] uppercase">
                {destination.region}
              </p>
              <h2 className="mt-2 text-2xl font-black">{destination.name}</h2>
              <p className="text-muted mt-3 flex-1 text-sm leading-6">
                {destination.summary}
              </p>
              <div className="text-peacock-deep mt-5 flex items-center gap-2 text-xs font-bold">
                <Compass size={16} />
                {destination.templeSlugs.length} temple{" "}
                {destination.templeSlugs.length === 1 ? "profile" : "profiles"}
              </div>
              <Link
                href={`/destinations/${destination.slug}`}
                className="bg-charcoal mt-5 inline-flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-extrabold text-white"
              >
                Explore destination <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
