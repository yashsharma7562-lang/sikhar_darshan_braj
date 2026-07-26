import { redirect } from "next/navigation";
import { getCustomerSession } from "@/features/auth/session";
export default async function CustomerAssistancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await getCustomerSession()))
    redirect("/" + locale + "/login?next=assistance");
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Private assistance centre
      </p>
      <h1 className="mt-3 text-4xl font-black">
        Family and mobility assistance
      </h1>
      <p className="text-muted mt-4 max-w-3xl">
        Manage consent-based family profiles and assistance requests without
        treating a request as confirmed service.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-7">
          <h2 className="text-xl font-black">Family travellers</h2>
          <p className="text-muted mt-3">
            No family traveller records are connected.
          </p>
        </article>
        <article className="rounded-2xl border bg-white p-7">
          <h2 className="text-xl font-black">Assistance requests</h2>
          <p className="text-muted mt-3">
            No wheelchair, mobility, room or vehicle assistance is confirmed.
          </p>
        </article>
      </div>
    </section>
  );
}
