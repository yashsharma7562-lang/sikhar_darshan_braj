import { BadgeCheck, BedDouble, Building2, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { StaySearchPanel } from "@/components/stay/stay-search-panel";
import { stayRepository } from "@/features/stays/repository";

export const metadata: Metadata = {
  title: "Verified Stays in Braj",
  description:
    "Search verification-aware hotels, dharamshalas and guest accommodation for a Braj pilgrimage.",
};
export default async function StaysPage() {
  const properties = await stayRepository.search({
    destination: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0,
    propertyTypes: [],
    accessibilityRequired: false,
    verifiedOnly: true,
  });
  return (
    <>
      <section className="bg-sand/60 border-b py-14">
        <div className="container-shell">
          <p className="text-primary-deep flex items-center gap-2 text-sm font-extrabold tracking-[.2em] uppercase">
            <BedDouble size={18} />
            Stay booking
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            A comfortable stay starts with verified details.
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg leading-8">
            Compare hotels, dharamshalas and guest stays with clear policies,
            accessibility evidence and server-checked availability.
          </p>
        </div>
      </section>
      <div className="container-shell py-10">
        <StaySearchPanel />
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black">Verified stays</h2>
            <p className="text-muted mt-1 text-sm">
              {properties.length} properties ready to book
            </p>
          </div>
          <select
            aria-label="Sort properties"
            className="min-h-11 rounded-xl border bg-white px-3 font-bold"
          >
            <option>Recommended</option>
            <option>Price: low to high</option>
            <option>Distance from temple</option>
          </select>
        </div>
        {properties.length ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-3" />
        ) : (
          <div className="mt-6 rounded-[1.75rem] border border-dashed bg-white p-10 text-center">
            <Building2 className="text-muted mx-auto" size={46} />
            <h2 className="mt-5 text-2xl font-black">
              Verified inventory is being onboarded
            </h2>
            <p className="text-muted mx-auto mt-3 max-w-2xl leading-7">
              No property is displayed until its organisation, policies, room
              inventory and claimed accessibility facilities complete review. We
              will not fill this space with demonstration availability.
            </p>
            <div className="mx-auto mt-7 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
              <Trust icon={BadgeCheck} title="Identity review" />
              <Trust icon={ShieldCheck} title="Policy review" />
              <Trust icon={BedDouble} title="Inventory connection" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
function Trust({
  icon: Icon,
  title,
}: {
  icon: typeof BadgeCheck;
  title: string;
}) {
  return (
    <div className="bg-cream flex items-center gap-3 rounded-xl p-4 text-sm font-bold">
      <Icon className="text-peacock" size={19} />
      {title}
    </div>
  );
}
