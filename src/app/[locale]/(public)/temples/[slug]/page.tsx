import {
  AlertTriangle,
  CalendarClock,
  CircleHelp,
  Clock3,
  ExternalLink,
  Info,
  Landmark,
  MapPin,
  Radio,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportCorrectionForm } from "@/components/temple/report-correction-form";
import {
  TempleStatusBadge,
  VerificationBadge,
} from "@/components/temple/status-badge";
import { crowdLabels } from "@/features/temples/status";
import { templeRepository } from "@/features/temples/repository";

export async function generateStaticParams() {
  const temples = await templeRepository.listTemples();
  return temples.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const temple = await templeRepository.getTemple(slug);
  return temple ? { title: temple.name, description: temple.summary } : {};
}
export default async function TempleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const temple = await templeRepository.getTemple(slug);
  if (!temple) notFound();
  return (
    <>
      <section className="bg-charcoal border-b py-14 text-white">
        <div className="container-shell">
          <div className="flex flex-wrap items-center gap-3">
            <TempleStatusBadge status={temple.status} />
            <VerificationBadge status={temple.verificationStatus} />
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
            {temple.name}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-white/65">
            <MapPin size={18} />
            {temple.locality}, Braj
          </p>
          {temple.alternativeNames.length ? (
            <p className="mt-2 text-sm text-white/55">
              Also known as: {temple.alternativeNames.join(", ")}
            </p>
          ) : null}
        </div>
      </section>
      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_22rem]">
        <main className="space-y-7">
          <InfoPanel icon={CalendarClock} title="General darshan schedule">
            <EmptyVerification text="No approved schedule is available yet. This page will not infer opening hours from an unverified record." />
          </InfoPanel>
          <InfoPanel icon={AlertTriangle} title="Notices and temporary changes">
            <EmptyVerification text="No verified current notices are published. This does not confirm that no closure or special schedule exists." />
          </InfoPanel>
          <InfoPanel icon={UsersRound} title="Crowd awareness">
            <div className="bg-sand/60 flex items-start gap-4 rounded-xl p-4">
              <span className="text-muted rounded-full bg-white px-3 py-1 text-xs font-extrabold">
                {crowdLabels[temple.crowd.level]}
              </span>
              <p className="text-muted text-sm leading-6">
                {temple.crowd.note} Waiting time and entry speed are never
                guaranteed.
              </p>
            </div>
          </InfoPanel>
          <InfoPanel icon={Landmark} title="Facilities and accessibility">
            <div className="grid gap-3 sm:grid-cols-2">
              {temple.facilities.map((facility) => (
                <div
                  key={facility.label}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <span className="text-sm font-bold">{facility.label}</span>
                  <span className="text-muted text-xs font-extrabold">
                    Not verified
                  </span>
                </div>
              ))}
            </div>
          </InfoPanel>
          <InfoPanel icon={Radio} title="Official live darshan">
            <EmptyVerification text="No authorised or publicly embeddable stream has been verified for this profile." />
          </InfoPanel>
          <InfoPanel icon={CircleHelp} title="Report incorrect information">
            <p className="text-muted mb-5 text-sm leading-6">
              Reports are reviewed before any public information changes. A
              source link helps the verification team.
            </p>
            <ReportCorrectionForm templeSlug={temple.slug} />
          </InfoPanel>
        </main>
        <aside className="space-y-5">
          <div className="rounded-2xl border bg-white p-5">
            <h2 className="font-black">Information provenance</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <Detail
                label="Source"
                value={temple.sourceLabel ?? "Not yet approved"}
              />
              <Detail
                label="Last verified"
                value={temple.lastVerifiedAt ?? "Not verified"}
              />
              <Detail
                label="Next review"
                value={temple.reviewDueAt ?? "Pending initial review"}
              />
            </dl>
          </div>
          <div className="border-primary/20 bg-primary/5 rounded-2xl border p-5">
            <ShieldCheck className="text-primary-deep" />
            <h2 className="mt-3 font-black">Equal access policy</h2>
            <p className="text-muted mt-2 text-sm leading-6">
              Shikhar Darshan Braj does not sell VIP darshan, guaranteed temple
              entry or unauthorised priority access.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <Clock3 className="text-warning" />
            <p className="mt-3 text-sm leading-6 font-bold">
              Timings may change during festivals and special occasions. Please
              verify before travelling.
            </p>
          </div>
          {temple.officialWebsite ? (
            <a
              href={temple.officialWebsite}
              rel="noreferrer"
              target="_blank"
              className="text-peacock-deep inline-flex items-center gap-2 font-bold"
            >
              Official website <ExternalLink size={16} />
            </a>
          ) : null}
        </aside>
      </div>
    </>
  );
}
function InfoPanel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Info;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border bg-white p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="bg-cream text-primary-deep grid size-10 place-items-center rounded-xl">
          <Icon size={20} />
        </span>
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      {children}
    </section>
  );
}
function EmptyVerification({ text }: { text: string }) {
  return (
    <div className="bg-sand/30 text-muted rounded-xl border border-dashed p-4 text-sm leading-6">
      {text}
    </div>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted font-bold">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}
