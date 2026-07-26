import {
  Accessibility,
  BadgeCheck,
  CalendarDays,
  Footprints,
  PackageOpen,
} from "lucide-react";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { packageRepository } from "@/features/packages/repository";
export const metadata: Metadata = {
  title: "Braj Yatra Packages",
  description:
    "Explore verification-aware Braj pilgrimage packages and physical-effort guidance.",
};
export default async function PackagesPage() {
  const packages = await packageRepository.listVerified();
  return (
    <>
      <section className="border-b bg-[#F5EBCF] py-14">
        <div className="container-shell">
          <p className="text-primary-deep flex items-center gap-2 text-sm font-extrabold tracking-[.2em] uppercase">
            <PackageOpen size={18} />
            Yatra packages
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Choose a journey for your pace, not just your calendar.
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg leading-8">
            Every package will show route, inclusions, exclusions, walking
            effort, accessibility limits and verified departure availability.
          </p>
          <Link
            href="/plan"
            className="bg-peacock-deep mt-7 inline-flex min-h-12 items-center rounded-xl px-6 font-extrabold text-white"
          >
            Build a custom yatra
          </Link>
        </div>
      </section>
      <div className="container-shell py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <Promise
            icon={Footprints}
            title="Effort made visible"
            copy="Walking, stairs, uneven surfaces and travel hours are labelled."
          />
          <Promise
            icon={Accessibility}
            title="Access limitations"
            copy="Unknown facilities are never presented as accessible."
          />
          <Promise
            icon={CalendarDays}
            title="Verified departures"
            copy="Availability appears only after operator confirmation."
          />
        </div>
        {packages.length ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-3" />
        ) : (
          <div className="mt-8 rounded-[1.75rem] border border-dashed bg-white p-10 text-center">
            <BadgeCheck className="text-muted mx-auto" size={44} />
            <h2 className="mt-5 text-2xl font-black">
              Verified packages are being onboarded
            </h2>
            <p className="text-muted mx-auto mt-3 max-w-2xl leading-7">
              No package, departure, hotel, vehicle or price is shown until the
              complete supply chain and itinerary facts have been reviewed.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
function Promise({
  icon: Icon,
  title,
  copy,
}: {
  icon: typeof Footprints;
  title: string;
  copy: string;
}) {
  return (
    <article className="rounded-2xl border bg-white p-5">
      <Icon className="text-peacock" />
      <h2 className="mt-4 font-black">{title}</h2>
      <p className="text-muted mt-2 text-sm leading-6">{copy}</p>
    </article>
  );
}
