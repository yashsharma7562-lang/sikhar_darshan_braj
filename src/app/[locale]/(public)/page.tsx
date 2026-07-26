import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  BellRing,
  BusFront,
  CalendarHeart,
  CarFront,
  Check,
  CircleHelp,
  Clock3,
  Compass,
  Footprints,
  Headphones,
  HeartHandshake,
  Hotel,
  Landmark,
  Languages,
  Map,
  MapPin,
  Navigation,
  PhoneCall,
  Quote,
  Route,
  ShieldCheck,
  Sparkles,
  TrainFront,
  UsersRound,
  Utensils,
  WalletCards,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { ReactNode } from "react";
import { SeniorModeToggle } from "@/components/accessibility/senior-mode-toggle";
import { HomeSearch } from "@/components/search/home-search";
import { Link } from "@/i18n/navigation";

const destinations = [
  {
    name: "Vrindavan",
    note: "Temple lanes & Yamuna ghats",
    icon: Landmark,
    tone: "bg-[#FCE7D5] text-primary-deep",
  },
  {
    name: "Mathura",
    note: "Sacred city & heritage",
    icon: MapPin,
    tone: "bg-[#E0EEF4] text-peacock-deep",
  },
  {
    name: "Govardhan",
    note: "Parikrama & kunds",
    icon: Footprints,
    tone: "bg-[#E6EFE2] text-success",
  },
  {
    name: "Barsana",
    note: "Hill temples & traditions",
    icon: Sparkles,
    tone: "bg-[#F4DFE7] text-radha-rose",
  },
  {
    name: "Gokul",
    note: "Quiet Braj discovery",
    icon: HeartHandshake,
    tone: "bg-[#F5EBCF] text-[#8A6518]",
  },
  {
    name: "Nandgaon",
    note: "Village heritage circuit",
    icon: Compass,
    tone: "bg-[#E4E9F4] text-yamuna",
  },
] as const;

const trusts = [
  [
    BadgeCheck,
    "Verification-first",
    "Partner details reviewed before badges appear",
  ],
  [
    WalletCards,
    "Transparent pricing",
    "Charges and policies shown before payment",
  ],
  [ShieldCheck, "Secure by design", "Privacy-minded planning and payments"],
  [
    Languages,
    "Hindi assistance",
    "Clear support for Hindi and English journeys",
  ],
  [
    Accessibility,
    "Senior-friendly",
    "Pace, access and mobility needs considered",
  ],
  [
    Headphones,
    "On-trip support",
    "A clear path to help throughout the journey",
  ],
] as const;

const journeys = [
  {
    days: "1 day",
    title: "Vrindavan at a gentle pace",
    route: "Temple district • Yamuna area • Rest breaks",
    tag: "Low travel time",
    accent: "border-primary/30",
  },
  {
    days: "3 days",
    title: "Mathura & Vrindavan essentials",
    route: "Mathura • Gokul • Vrindavan",
    tag: "Family favourite",
    accent: "border-peacock/30",
  },
  {
    days: "5 days",
    title: "The wider Braj circuit",
    route: "Govardhan • Barsana • Nandgaon • Radha Kund",
    tag: "Balanced pace",
    accent: "border-radha-rose/30",
  },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <section className="relative min-h-[680px] overflow-hidden bg-[#F8ECDC] pt-16 pb-40 sm:pt-24">
        <Image
          src="/images/braj-yamuna-hero.webp"
          alt="Temple ghats beside calm river water at sunrise in Braj"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,249,239,.98)_0%,rgba(255,249,239,.92)_38%,rgba(255,249,239,.28)_72%,rgba(255,249,239,.05)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(38,34,29,.14),transparent_35%)]" />
        <div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.12fr_.88fr]">
          <div>
            <p className="border-temple-gold/25 text-primary-deep mb-5 inline-flex items-center gap-2 rounded-full border bg-white/75 px-4 py-2 text-sm font-extrabold backdrop-blur">
              <Sparkles size={17} aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h1 className="text-charcoal max-w-3xl text-4xl leading-[1.05] font-black tracking-[-.04em] sm:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="text-muted mt-6 max-w-2xl text-lg leading-8">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/plan"
                className="bg-primary shadow-primary/20 hover:bg-primary-deep inline-flex min-h-13 items-center justify-center gap-2 rounded-xl px-6 font-extrabold text-white shadow-xl"
              >
                {t("primary")}
                <ArrowRight size={19} aria-hidden="true" />
              </Link>
              <Link
                href="/temples"
                className="border-peacock-deep text-peacock-deep hover:bg-peacock-deep inline-flex min-h-13 items-center justify-center rounded-xl border-2 bg-white/55 px-6 font-extrabold hover:text-white"
              >
                {t("secondary")}
              </Link>
            </div>
          </div>
          <div className="hidden min-h-[430px] lg:block" aria-hidden="true" />
        </div>
      </section>

      <HomeSearch />

      <section className="container-shell py-12" aria-label="Platform promises">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {trusts.map(([Icon, title, copy]) => (
            <article key={title} className="rounded-2xl border bg-white p-4">
              <Icon className="text-peacock" size={22} aria-hidden="true" />
              <h2 className="mt-3 text-sm font-extrabold">{title}</h2>
              <p className="text-muted mt-1 text-xs leading-5">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Start with a place"
        title="Braj, one sacred stop at a time"
        copy="Explore destinations by the kind of journey you want—calm temple lanes, parikrama routes, heritage or a wider circuit."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map(({ name, note, icon: Icon, tone }) => (
            <Link
              key={name}
              href="/destinations"
              className="group flex min-h-40 items-end justify-between overflow-hidden rounded-[1.5rem] border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <span
                  className={`grid size-11 place-items-center rounded-xl ${tone}`}
                >
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-black">{name}</h3>
                <p className="text-muted mt-1 text-sm">{note}</p>
              </div>
              <ArrowRight
                className="text-primary mb-1 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </Section>

      <section className="bg-charcoal py-20 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <Eyebrow light>Temple planning</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Reliable information matters more than a green “open” badge.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/65">
              We only present operational temple information with its source and
              verification state. Festival schedules can change, so devotees
              always see when to verify again.
            </p>
            <Link
              href="/temples"
              className="text-charcoal mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 font-extrabold"
            >
              Explore temple guide <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Banke Bihari Temple",
              "Shri Krishna Janmasthan",
              "Govardhan pilgrimage area",
              "Barsana temple circuit",
            ].map((name) => (
              <article
                key={name}
                className="rounded-2xl border border-white/10 bg-white/[.06] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <Landmark className="text-soft-gold" aria-hidden="true" />
                  <span className="bg-warning/15 rounded-full px-3 py-1 text-xs font-bold text-[#FFBE5C]">
                    Update pending
                  </span>
                </div>
                <h3 className="mt-5 font-extrabold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  No live schedule is published here until an approved source is
                  verified.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white/75">
                  <Clock3 size={15} /> Verify before travelling
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section
        eyebrow="Thoughtful itineraries"
        title="Choose a journey that fits your pace"
        copy="These are clearly labelled planning examples—not live inventory or guaranteed temple schedules."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {journeys.map((journey) => (
            <article
              key={journey.title}
              className={`rounded-[1.5rem] border-t-4 bg-white p-6 shadow-sm ${journey.accent}`}
            >
              <div className="flex items-center justify-between">
                <span className="bg-sand text-primary-deep rounded-full px-3 py-1 text-xs font-extrabold">
                  Planning example
                </span>
                <strong className="text-peacock-deep">{journey.days}</strong>
              </div>
              <h3 className="mt-6 text-xl font-black">{journey.title}</h3>
              <p className="text-muted mt-3 text-sm leading-6">
                {journey.route}
              </p>
              <div className="text-success mt-6 flex items-center gap-2 border-t pt-4 text-sm font-bold">
                <Check size={17} />
                {journey.tag}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/packages"
            className="bg-peacock-deep inline-flex min-h-12 items-center gap-2 rounded-xl px-6 font-extrabold text-white"
          >
            See all yatra ideas <ArrowRight size={18} />
          </Link>
        </div>
      </Section>

      <section className="bg-[#EAF2F3] py-20">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <div className="bg-charcoal relative min-h-[420px] overflow-hidden rounded-[2rem] text-white shadow-xl">
            <Image
              src="/images/senior-friendly-yatra.webp"
              alt="Senior devotees walking with family support at a Braj temple"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="from-charcoal/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            <div className="bg-charcoal/65 absolute right-6 bottom-6 left-6 rounded-2xl border border-white/20 p-5 backdrop-blur-md">
              <p className="text-soft-gold flex items-center gap-2 text-sm font-bold tracking-[.16em] uppercase">
                <Accessibility size={20} /> Comfort is part of seva
              </p>
              <p className="mt-2 text-lg font-black">
                A slower, supported experience for every devotee.
              </p>
            </div>
          </div>
          <div>
            <Eyebrow>Senior-friendly planning</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Plan around the person, not just the route.
            </h2>
            <p className="text-muted mt-5 leading-7">
              Record walking tolerance, preferred pace, lift needs, ground-floor
              preferences and rest requirements. Accessibility details remain
              clearly labelled as verified, requested or unavailable.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Easy-to-read interface",
                "Prominent support access",
                "Family journey sharing",
                "Emergency contacts",
                "No medical claims",
                "Transparent limitations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-bold"
                >
                  <Check className="text-success" size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <SeniorModeToggle />
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Braj Chaurasi Kos"
        title="See the whole circuit, one stage at a time"
        copy="A future-ready route experience for walking, vehicle and mixed journeys—with safety, rest and offline needs built into the plan."
      >
        <div className="grid overflow-hidden rounded-[2rem] border bg-white lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-[390px] overflow-hidden bg-[#F4EBDD]">
            <Image
              src="/images/govardhan-parikrama.webp"
              alt="Govardhan parikrama path beside a peaceful kund in Braj"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
            <div className="from-charcoal/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-sm font-extrabold shadow-lg backdrop-blur">
              <Route className="text-primary" size={21} />
              Traditional stages • route guidance
            </div>
          </div>
          <div className="p-7 sm:p-10">
            <h3 className="text-2xl font-black">
              Built for preparation and continuity
            </h3>
            <div className="mt-7 space-y-5">
              {[
                [Map, "Stage-by-stage route"],
                [Navigation, "Walking and vehicle modes"],
                [PhoneCall, "Safety and emergency points"],
                [BellRing, "Advisory-ready alerts"],
              ].map(([Icon, label]) => {
                const ItemIcon = Icon as typeof Map;
                return (
                  <div
                    key={label as string}
                    className="flex items-center gap-4"
                  >
                    <span className="bg-cream text-primary-deep grid size-11 place-items-center rounded-xl">
                      <ItemIcon size={21} />
                    </span>
                    <span className="font-bold">{label as string}</span>
                  </div>
                );
              })}
            </div>
            <Link
              href="/destinations"
              className="bg-charcoal mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl px-5 font-extrabold text-white"
            >
              Discover the circuit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Section>

      <section className="bg-white py-20">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <Eyebrow>Local transport</Eyebrow>
              <h2 className="mt-3 text-3xl font-black">
                From arrival to every Braj stop.
              </h2>
              <p className="text-muted mt-4 leading-7">
                Compare the right mode for pickup, local travel, groups and
                mobility requests—with fare policies visible before booking.
              </p>
              <Link
                href="/transport"
                className="text-peacock-deep mt-6 inline-flex items-center gap-2 font-extrabold"
              >
                Explore transport <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [TrainFront, "Station pickup"],
                [CarFront, "Local cab"],
                [BusFront, "Group travel"],
                [Accessibility, "Accessible request"],
              ].map(([Icon, label]) => {
                const ItemIcon = Icon as typeof TrainFront;
                return (
                  <article
                    key={label as string}
                    className="bg-cream rounded-2xl border p-5"
                  >
                    <ItemIcon className="text-primary" />
                    <h3 className="mt-7 text-sm font-extrabold">
                      {label as string}
                    </h3>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Plan around festivals"
        title="Celebrate with context, preparation and respect"
        copy="Festival guidance will use verified schedules and advisories. Until then, the platform never invents dates, closures or crowd conditions."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              CalendarHeart,
              "Holi in Braj",
              "Understand local traditions and plan a realistic pace.",
            ],
            [
              BellRing,
              "Janmashtami",
              "Watch for official schedule and access updates.",
            ],
            [
              Sparkles,
              "Kartik journeys",
              "Prepare for seasonal demand and changing timings.",
            ],
          ].map(([Icon, title, copy]) => {
            const ItemIcon = Icon as typeof CalendarHeart;
            return (
              <article
                key={title as string}
                className="rounded-[1.5rem] border bg-white p-6"
              >
                <ItemIcon className="text-radha-rose" size={26} />
                <h3 className="mt-5 text-xl font-black">{title as string}</h3>
                <p className="text-muted mt-2 text-sm leading-6">
                  {copy as string}
                </p>
                <span className="text-warning mt-5 inline-block text-xs font-extrabold tracking-wide uppercase">
                  Dates shown after verification
                </span>
              </article>
            );
          })}
        </div>
      </Section>

      <section className="bg-sand/55 border-y py-16">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <article className="rounded-[1.5rem] bg-white p-7">
            <Hotel className="text-peacock" />
            <h2 className="mt-5 text-2xl font-black">
              Verified stays near temples
            </h2>
            <p className="text-muted mt-3 leading-7">
              No property is presented as verified until document and
              operational reviews are complete.
            </p>
            <div className="text-muted mt-6 rounded-xl border border-dashed p-4 text-sm font-bold">
              Partner onboarding is in progress. Verified inventory will appear
              here.
            </div>
          </article>
          <article className="rounded-[1.5rem] bg-white p-7">
            <Quote className="text-primary" />
            <h2 className="mt-5 text-2xl font-black">Reviews you can trust</h2>
            <p className="text-muted mt-3 leading-7">
              Only completed or otherwise verified bookings can receive a
              verified-booking review badge.
            </p>
            <div className="text-muted mt-6 rounded-xl border border-dashed p-4 text-sm font-bold">
              Verified traveller stories will appear after completed journeys.
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          <article className="rounded-[1.5rem] border p-7">
            <Utensils className="text-success" />
            <h2 className="mt-5 text-xl font-black">Braj food & culture</h2>
            <p className="text-muted mt-3 text-sm leading-6">
              Discover vegetarian food customs, ghats, kunds and local stories
              with cultural context.
            </p>
          </article>
          <article className="rounded-[1.5rem] border p-7">
            <ShieldCheck className="text-peacock" />
            <h2 className="mt-5 text-xl font-black">Travel with awareness</h2>
            <p className="text-muted mt-3 text-sm leading-6">
              Keep emergency resources, public facilities and support paths easy
              to find.
            </p>
          </article>
          <article className="rounded-[1.5rem] border p-7">
            <CircleHelp className="text-primary" />
            <h2 className="mt-5 text-xl font-black">Need a human?</h2>
            <p className="text-muted mt-3 text-sm leading-6">
              Clear Hindi and English support for planning, bookings and on-trip
              concerns.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-peacock-deep py-16 text-white">
        <div className="container-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-soft-gold text-sm font-extrabold tracking-[.22em] uppercase">
              Built with local partners
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black">
              Serve devotees with better tools and transparent operations.
            </h2>
            <p className="mt-3 max-w-2xl text-white/65">
              Hotels, transport operators, guides and accessibility providers
              can register for verification.
            </p>
          </div>
          <Link
            href="/vendor/register"
            className="text-peacock-deep inline-flex min-h-13 shrink-0 items-center gap-2 rounded-xl bg-white px-6 font-extrabold"
          >
            Become a verified partner <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container-shell border-primary/20 shadow-primary/5 rounded-[2rem] border bg-white p-8 text-center shadow-xl sm:p-12">
          <p className="bg-sand text-primary-deep mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold">
            <UsersRound size={17} />
            Your journey, thoughtfully planned
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
            Begin with what matters to your family.
          </h2>
          <p className="text-muted mx-auto mt-5 max-w-2xl leading-7">
            Tell us the pace, places, budget and assistance you prefer. The plan
            stays transparent and never promises unauthorised temple access.
          </p>
          <Link
            href="/plan"
            className="bg-primary hover:bg-primary-deep mt-8 inline-flex min-h-13 items-center gap-2 rounded-xl px-7 font-extrabold text-white"
          >
            Plan my Braj yatra <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

function Section({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <section className="py-20">
      <div className="container-shell">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              {title}
            </h2>
          </div>
          <p className="text-muted max-w-xl leading-7">{copy}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-sm font-extrabold tracking-[.2em] uppercase ${light ? "text-soft-gold" : "text-primary-deep"}`}
    >
      {children}
    </p>
  );
}
