import {
  BadgeCheck,
  BusFront,
  CarFront,
  IndianRupee,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { TransportSearchPanel } from "@/components/transport/transport-search-panel";
import { transportRepository } from "@/features/transport/repository";
export const metadata: Metadata = {
  title: "Braj Transport Booking",
  description:
    "Search verified local transport with transparent fare and operational safeguards.",
};
export default async function TransportPage() {
  const vehicles = await transportRepository.search({
    pickup: "",
    drop: "",
    date: "",
    time: "",
    passengers: 2,
    luggage: 1,
    seniorCitizens: 0,
    wheelchairRequired: false,
    journeyType: "one-way",
  });
  return (
    <>
      <section className="border-b bg-[#EAF2F3] py-14">
        <div className="container-shell">
          <p className="text-peacock-deep flex items-center gap-2 text-sm font-extrabold tracking-[.2em] uppercase">
            <CarFront size={18} />
            Local transport
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Clear fares. Verified operators. Safer journeys.
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg leading-8">
            Plan station pickups, local sightseeing and multi-day travel with
            every toll, parking, waiting and night-charge policy visible.
          </p>
        </div>
      </section>
      <div className="container-shell py-10">
        <TransportSearchPanel />
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black">Available vehicles</h2>
              <p className="text-muted mt-1 text-sm">
                {vehicles.length} verified options
              </p>
            </div>
          </div>
          {vehicles.length ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-3" />
          ) : (
            <div className="mt-6 rounded-[1.75rem] border border-dashed bg-white p-10 text-center">
              <BusFront className="text-muted mx-auto" size={48} />
              <h2 className="mt-5 text-2xl font-black">
                Verified transport inventory is being connected
              </h2>
              <p className="text-muted mx-auto mt-3 max-w-2xl leading-7">
                Vehicles appear only after operator, driver, vehicle and
                rate-card verification. No demonstration driver or fabricated
                fare is shown.
              </p>
              <div className="mx-auto mt-7 grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
                <Trust icon={BadgeCheck} title="Operator review" />
                <Trust icon={ShieldCheck} title="Driver verification" />
                <Trust icon={IndianRupee} title="Rate-card review" />
                <Trust icon={KeyRound} title="Trip-start OTP" />
              </div>
            </div>
          )}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          <Info
            title="Before pickup"
            copy="Driver contact remains private until operationally required. Vehicle and verification details appear after assignment."
          />
          <Info
            title="During the trip"
            copy="The trip begins only after a customer-provided OTP is verified. Live status never implies location tracking without consent."
          />
          <Info
            title="When something changes"
            copy="Support can coordinate incidents, delayed vehicles and driver replacement through audited status transitions."
          />
        </section>
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
function Info({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-2xl border bg-white p-6">
      <h2 className="font-black">{title}</h2>
      <p className="text-muted mt-3 text-sm leading-6">{copy}</p>
    </article>
  );
}
