import { ArrowRight, Landmark, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TempleRecord } from "@/features/temples/types";
import { TempleStatusBadge, VerificationBadge } from "./status-badge";

export function TempleCard({ temple }: { temple: TempleRecord }) {
  return (
    <article className="group flex h-full flex-col rounded-[1.5rem] border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <span className="bg-sand text-primary-deep grid size-12 place-items-center rounded-2xl">
          <Landmark size={24} aria-hidden="true" />
        </span>
        <TempleStatusBadge status={temple.status} />
      </div>
      <h2 className="mt-5 text-xl font-black">{temple.name}</h2>
      <p className="text-muted mt-2 flex items-center gap-1.5 text-sm font-semibold">
        <MapPin size={15} aria-hidden="true" />
        {temple.locality}
      </p>
      <p className="text-muted mt-4 flex-1 text-sm leading-6">
        {temple.summary}
      </p>
      <div className="mt-5 border-t pt-4">
        <VerificationBadge status={temple.verificationStatus} />
      </div>
      <Link
        href={`/temples/${temple.slug}`}
        className="bg-cream text-peacock-deep mt-4 inline-flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-extrabold"
      >
        View verified details{" "}
        <ArrowRight
          size={17}
          className="transition group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}
