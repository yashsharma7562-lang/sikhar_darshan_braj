import {
  Accessibility,
  CalendarX,
  CheckCircle2,
  Clock3,
  ImageIcon,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatInr } from "@/features/stays/pricing";
import { stayRepository } from "@/features/stays/repository";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await stayRepository.getBySlug(slug);
  return property
    ? { title: property.name, description: property.summary }
    : {};
}
export default async function StayDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await stayRepository.getBySlug(slug);
  if (!property || property.verificationStatus !== "verified") notFound();
  return (
    <>
      <section className="bg-charcoal border-b py-12 text-white">
        <div className="container-shell">
          <div className="text-soft-gold flex items-center gap-2 text-sm font-bold">
            <ShieldCheck size={17} />
            Verified {property.type}
          </div>
          <h1 className="mt-3 text-4xl font-black">{property.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-white/65">
            <MapPin size={17} />
            {property.locality}
          </p>
        </div>
      </section>
      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_21rem]">
        <main className="space-y-7">
          <section className="bg-sand/50 grid min-h-72 place-items-center rounded-[1.5rem] border">
            <div className="text-muted text-center">
              <ImageIcon className="mx-auto" size={42} />
              <p className="mt-3 font-bold">Verified property media</p>
            </div>
          </section>
          <Panel title="About this stay">
            <p className="text-muted leading-7">{property.summary}</p>
          </Panel>
          <Panel title="Rooms and availability">
            <div className="space-y-4">
              {property.roomTypes.map((room) => (
                <article key={room.id} className="rounded-2xl border p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black">{room.name}</h3>
                      <p className="text-muted mt-1 text-sm">
                        {room.bedConfiguration} • Up to {room.capacityAdults}{" "}
                        adults
                      </p>
                    </div>
                    <strong className="text-peacock-deep text-xl">
                      {formatInr(room.baseRateMinor)}
                      <span className="text-muted block text-right text-xs font-medium">
                        base nightly rate
                      </span>
                    </strong>
                  </div>
                  <div className="bg-sand/50 text-muted mt-5 rounded-xl p-3 text-sm font-bold">
                    <CalendarX className="mr-2 inline" size={17} />
                    Select dates for server-checked availability
                  </div>
                </article>
              ))}
            </div>
          </Panel>
          <Panel title="Facilities and accessibility">
            <div className="grid gap-3 sm:grid-cols-2">
              {property.facilities.map((facility) => (
                <div
                  key={facility.key}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <span className="font-bold">{facility.label}</span>
                  <span className="text-muted text-xs font-extrabold">
                    {facility.state.replaceAll("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Policies">
            <dl className="grid gap-4 sm:grid-cols-2">
              <Policy
                icon={Clock3}
                label="Check-in"
                value={property.policies.checkIn ?? "Confirm with property"}
              />
              <Policy
                icon={Clock3}
                label="Check-out"
                value={property.policies.checkOut ?? "Confirm with property"}
              />
              <Policy
                icon={CheckCircle2}
                label="Cancellation"
                value={
                  property.policies.cancellationSummary ??
                  "Shown before booking"
                }
              />
              <Policy
                icon={Accessibility}
                label="Requests"
                value="Requests are not guaranteed until confirmed"
              />
            </dl>
          </Panel>
        </main>
        <aside>
          <div className="sticky top-24 rounded-2xl border bg-white p-5 shadow-lg">
            <h2 className="text-xl font-black">Check availability</h2>
            <p className="text-muted mt-2 text-sm leading-6">
              Rates and inventory are recalculated on the server before any
              reservation.
            </p>
            <button
              disabled
              className="bg-primary mt-5 min-h-12 w-full rounded-xl font-extrabold text-white disabled:opacity-50"
            >
              Choose dates first
            </button>
            <p className="text-muted mt-3 text-xs leading-5">
              No amount, discount or availability from the browser is trusted.
            </p>
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
      <h2 className="mb-5 text-xl font-black">{title}</h2>
      {children}
    </section>
  );
}
function Policy({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="text-primary mt-0.5 shrink-0" size={19} />
      <div>
        <dt className="text-sm font-black">{label}</dt>
        <dd className="text-muted mt-1 text-sm">{value}</dd>
      </div>
    </div>
  );
}
