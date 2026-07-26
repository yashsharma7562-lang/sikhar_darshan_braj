import { redirect } from "next/navigation";
import { LoginPanel } from "@/components/auth/login-panel";
import { getCustomerSession } from "@/features/auth/session";
export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (await getCustomerSession()) redirect("/" + locale + "/dashboard");
  return (
    <section className="container-shell py-12 md:py-20">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-peacock-deep rounded-3xl p-8 text-white md:p-12">
          <p className="text-soft-gold text-sm font-bold tracking-widest uppercase">
            Customer account
          </p>
          <h1 className="mt-4 text-4xl font-black">
            Your Braj journey, kept together.
          </h1>
          <p className="mt-5 text-white/80">
            Access only your saved plans, verified bookings, family-sharing
            choices, emergency contacts, and privacy preferences.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>Server-verified session cookies</li>
            <li>Private records scoped to your Firebase identity</li>
            <li>Optional consent off by default</li>
          </ul>
        </div>
        <div className="rounded-3xl border bg-white p-7 shadow-sm md:p-10">
          <h2 className="text-2xl font-black">Sign in securely</h2>
          <p className="text-muted mt-2 mb-7 text-sm">
            Use Google or a verified mobile number.
          </p>
          <LoginPanel locale={locale} />
        </div>
      </div>
    </section>
  );
}
