import { Route, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { YatraBuilder } from "@/components/package/yatra-builder";
export const metadata: Metadata = {
  title: "Complete Yatra Builder",
  description:
    "Create a preference-based Braj planning draft without invented operational facts.",
};
export default function PlanPage() {
  return (
    <>
      <section className="bg-peacock-deep border-b py-14 text-white">
        <div className="container-shell">
          <p className="text-soft-gold flex items-center gap-2 text-sm font-extrabold tracking-[.2em] uppercase">
            <Route size={18} />
            Complete Yatra builder
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Start with your family’s real needs.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
            Choose pace, walking tolerance, destinations and mobility needs. The
            first output is a safe planning scaffold—not a booking or a promise.
          </p>
          <div className="text-soft-gold mt-6 flex items-center gap-2 text-sm font-bold">
            <ShieldCheck size={18} />
            No invented temple times, prices, closures or accessibility claims
          </div>
        </div>
      </section>
      <div className="container-shell py-10">
        <YatraBuilder />
      </div>
    </>
  );
}
