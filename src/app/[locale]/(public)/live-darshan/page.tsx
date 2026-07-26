import { BadgeCheck, Radio, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";
import { templeRepository } from "@/features/temples/repository";
export const metadata: Metadata = {
  title: "Official Live Darshan Directory",
  description:
    "A verification-first directory for authorised and publicly embeddable temple streams.",
};
export default async function LiveDarshanPage() {
  const temples = await templeRepository.listTemples();
  const streams = temples.filter((temple) => temple.liveStream !== null);
  return (
    <>
      <section className="bg-charcoal border-b py-16 text-white">
        <div className="container-shell">
          <p className="text-soft-gold flex items-center gap-2 text-sm font-extrabold tracking-[.2em] uppercase">
            <Radio size={17} />
            Live darshan directory
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black sm:text-5xl">
            Only authorised, attributable streams.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Streams appear only after public embedding permission and source
            identity have been reviewed.
          </p>
        </div>
      </section>
      <div className="container-shell py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <Policy
            icon={BadgeCheck}
            title="Official source"
            copy="Every stream must retain visible source attribution."
          />
          <Policy
            icon={Radio}
            title="Live-state integrity"
            copy="Recorded content is never presented as live."
          />
          <Policy
            icon={ShieldAlert}
            title="Broken stream reports"
            copy="Unavailable or changed streams are removed pending review."
          />
        </div>
        {streams.length ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {streams.map((temple) => (
              <article
                key={temple.id}
                className="rounded-2xl border bg-white p-5"
              >
                <h2 className="font-black">{temple.name}</h2>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-sand/35 mt-10 rounded-[1.5rem] border border-dashed p-10 text-center">
            <Radio className="text-muted mx-auto" size={40} />
            <h2 className="mt-4 text-xl font-black">
              No verified live streams yet
            </h2>
            <p className="text-muted mx-auto mt-2 max-w-xl text-sm leading-6">
              This directory remains empty until an authorised or publicly
              embeddable source completes verification. No unofficial recording
              will be labelled live.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
function Policy({
  icon: Icon,
  title,
  copy,
}: {
  icon: typeof Radio;
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
