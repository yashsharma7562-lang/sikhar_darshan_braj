import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";
import { TempleDirectory } from "@/components/temple/temple-directory";
import { templeRepository } from "@/features/temples/repository";
export const metadata: Metadata = {
  title: "Braj Temple Guide",
  description:
    "Verification-aware temple information for Braj pilgrimage planning.",
};
export default async function TemplesPage() {
  const temples = await templeRepository.listTemples();
  return (
    <>
      <section className="bg-sand/60 border-b py-16">
        <div className="container-shell">
          <p className="text-primary-deep text-sm font-extrabold tracking-[.2em] uppercase">
            Temple information directory
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Plan darshan with source-aware information.
          </h1>
          <p className="text-muted mt-5 max-w-2xl text-lg leading-8">
            Browse temple profiles, schedules, facilities, notices and crowd
            advisories—each clearly labelled by verification state.
          </p>
        </div>
      </section>
      <div className="container-shell py-10">
        <div className="border-warning/20 bg-warning/5 mb-8 flex gap-3 rounded-2xl border p-4 text-sm leading-6">
          <AlertTriangle className="text-warning mt-0.5 shrink-0" />
          <p>
            <strong>
              Timings may change during festivals and special occasions.
            </strong>{" "}
            Please verify before travelling. No “open” state is inferred from an
            outdated static record.
          </p>
        </div>
        <TempleDirectory temples={temples} />
      </div>
    </>
  );
}
