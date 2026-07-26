import { ArrowRight, Compass, Landmark, MapPin, Route } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TempleCard } from "@/components/temple/temple-card";
import { templeRepository } from "@/features/temples/repository";
import { Link } from "@/i18n/navigation";
export async function generateStaticParams() {
  const destinations = await templeRepository.listDestinations();
  return destinations.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await templeRepository.getDestination(slug);
  return destination
    ? {
        title: `${destination.name} Travel Guide`,
        description: destination.summary,
      }
    : {};
}
export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await templeRepository.getDestination(slug);
  if (!destination) notFound();
  const allTemples = await templeRepository.listTemples();
  const temples = allTemples.filter((temple) =>
    destination.templeSlugs.includes(temple.slug),
  );
  const allDestinations = await templeRepository.listDestinations();
  const nearby = allDestinations.filter((item) =>
    destination.nearbySlugs.includes(item.slug),
  );
  return (
    <>
      <section className="bg-sand/60 border-b py-16">
        <div className="container-shell">
          <div className="text-primary-deep flex items-center gap-2 text-sm font-extrabold tracking-[.18em] uppercase">
            <MapPin size={17} />
            {destination.region} destination
          </div>
          <h1 className="mt-4 text-5xl font-black tracking-tight">
            {destination.name}
          </h1>
          <p className="text-muted mt-5 max-w-2xl text-lg leading-8">
            {destination.summary}
          </p>
        </div>
      </section>
      <div className="container-shell py-12">
        <section>
          <div className="flex items-center gap-3">
            <Landmark className="text-primary" />
            <h2 className="text-2xl font-black">Temple profiles</h2>
          </div>
          <p className="text-muted mt-3 max-w-2xl text-sm leading-6">
            Operational fields remain unavailable until they have an approved
            source and review date.
          </p>
          {temples.length ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {temples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>
          ) : (
            <div className="text-muted mt-7 rounded-2xl border border-dashed p-7">
              No temple profile has completed initial catalogue review for this
              destination.
            </div>
          )}
        </section>
        <section className="bg-charcoal mt-14 rounded-[1.5rem] p-7 text-white">
          <div className="flex items-center gap-3">
            <Route className="text-soft-gold" />
            <h2 className="text-2xl font-black">Continue through Braj</h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {nearby.map((item) => (
              <Link
                key={item.slug}
                href={`/destinations/${item.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-4 font-bold hover:bg-white/20"
              >
                <Compass size={17} />
                {item.name}
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
