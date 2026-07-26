import { redirect } from "next/navigation";
import { BellRing, Gift, MessageSquareText, UsersRound } from "lucide-react";
import { getCustomerSession } from "@/features/auth/session";
export default async function RewardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getCustomerSession();
  if (!session) redirect("/" + locale + "/login?next=rewards");
  const cards = [
    [
      Gift,
      "Shikhar Rewards",
      "Points ledger and configured travel benefits. Points are not cash.",
    ],
    [
      UsersRound,
      "Referrals",
      "Expiry, reward conditions and fraud checks for every code.",
    ],
    [
      BellRing,
      "Notifications",
      "Transactional and promotional preferences remain separate.",
    ],
    [
      MessageSquareText,
      "Verified reviews",
      "Available only after an owned booking is completed.",
    ],
  ] as const;
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Rewards & communication
      </p>
      <h1 className="mt-3 text-4xl font-black">Your engagement centre</h1>
      <p className="text-muted mt-4">
        Rewards and messages appear only when connected records are available.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {cards.map(([Icon, title, text]) => (
          <article key={title} className="rounded-2xl border bg-white p-6">
            <Icon className="text-primary-deep" />
            <h2 className="mt-4 text-xl font-black">{title}</h2>
            <p className="text-muted mt-3 text-sm">{text}</p>
            <p className="text-warning mt-4 text-xs font-bold uppercase">
              No connected records
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
