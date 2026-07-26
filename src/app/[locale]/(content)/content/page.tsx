import { redirect } from "next/navigation";
import { CheckCheck, FileWarning, Landmark, ShieldCheck } from "lucide-react";
import { getPortalPrincipal } from "@/features/auth/authorization";
export default async function ContentPortal({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const contributor = await getPortalPrincipal(
    "content-contributor",
    "content.temples.submit",
  );
  const reviewer = await getPortalPrincipal(
    "content-reviewer",
    "content.moderate",
  );
  const principal = contributor ?? reviewer;
  if (!principal) redirect("/" + locale + "/login?next=content");
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Content Portal
      </p>
      <h1 className="mt-3 text-4xl font-black">Temple information workflow</h1>
      <p className="text-muted mt-4 max-w-3xl">
        Every schedule, notice, facility and source remains unpublished until
        evidence is reviewed and an authorised publisher approves it.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {[
          [
            Landmark,
            "Contributions",
            "Source-linked temple information submissions.",
          ],
          [
            FileWarning,
            "Review queue",
            "Conflicts, evidence and effective dates.",
          ],
          [
            ShieldCheck,
            "Moderation",
            "Approve, reject or request changes with reasons.",
          ],
          [
            CheckCheck,
            "Publication",
            "Separate permission and recorded decision required.",
          ],
        ].map(([Icon, title, text]) => {
          const ItemIcon = Icon as typeof Landmark;
          return (
            <article
              key={title as string}
              className="rounded-2xl border bg-white p-6"
            >
              <ItemIcon className="text-primary-deep" />
              <h2 className="mt-4 text-xl font-black">{title as string}</h2>
              <p className="text-muted mt-3 text-sm">{text as string}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
