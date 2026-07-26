import { redirect } from "next/navigation";
import { CreditCard, FileCheck2, RotateCcw, ShieldCheck } from "lucide-react";
import { getCustomerSession } from "@/features/auth/session";
export default async function PaymentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await getCustomerSession()))
    redirect("/" + locale + "/login?next=payments");
  const items = [
    [
      CreditCard,
      "Payment orders",
      "Created only from a server-recalculated booking with an active inventory hold.",
    ],
    [
      ShieldCheck,
      "Verification",
      "Checkout and webhook signatures are verified before status changes.",
    ],
    [
      RotateCcw,
      "Refunds",
      "Refund requests require confirmed ownership and refundable balance.",
    ],
    [
      FileCheck2,
      "Finance records",
      "Reconciliation, commission, tax, and payout entries remain auditable.",
    ],
  ] as const;
  return (
    <section className="container-shell py-10 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Payments and finance
      </p>
      <h1 className="mt-3 text-4xl font-black">Secure payment centre</h1>
      <p className="text-muted mt-4 max-w-3xl">
        No payment can begin until the server verifies inventory, ownership, and
        the final INR amount. Card details are handled by Razorpay and are never
        stored here.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map(([Icon, title, text]) => (
          <article key={title} className="rounded-2xl border bg-white p-6">
            <Icon className="text-primary-deep" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-black">{title}</h2>
            <p className="text-muted mt-3 text-sm">{text}</p>
          </article>
        ))}
      </div>
      <p className="bg-sand mt-6 rounded-xl p-4 text-sm">
        No payable verified booking is available. Checkout is disabled.
      </p>
    </section>
  );
}
