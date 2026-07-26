import { redirect } from "next/navigation";
import { BookingFlow } from "@/components/booking/booking-flow";
import { getCustomerSession } from "@/features/auth/session";
export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await getCustomerSession()))
    redirect("/" + locale + "/login?next=book");
  return (
    <section className="container-shell py-10 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Secure booking
      </p>
      <h1 className="mt-3 text-4xl font-black">
        Build and verify your booking
      </h1>
      <p className="text-muted mt-4 mb-8 max-w-3xl">
        Every amount is recalculated on the server. Confirmation is possible
        only after verified inventory is held and payment succeeds.
      </p>
      <BookingFlow />
    </section>
  );
}
