import { redirect } from "next/navigation";
import { getCustomerSession } from "@/features/auth/session";
export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await getCustomerSession()))
    redirect("/" + locale + "/login?next=chaurasi-kos/journey");
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Private journey record
      </p>
      <h1 className="mt-3 text-4xl font-black">Chaurasi Kos journey</h1>
      <p className="text-muted mt-4 max-w-3xl">
        Progress, offline route packs, location and family sharing activate only
        after a verified journey is created with explicit consent.
      </p>
      <div className="mt-8 rounded-3xl border bg-white p-8">
        <h2 className="text-2xl font-black">No active journey</h2>
        <p className="text-muted mt-3">
          A journey cannot be started because a complete verified route is not
          yet available. No progress or location has been recorded.
        </p>
      </div>
    </section>
  );
}
