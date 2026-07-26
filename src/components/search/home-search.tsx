"use client";

import {
  BedDouble,
  CalendarDays,
  CarFront,
  Compass,
  MapPin,
  Search,
  UsersRound,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SearchTab = "stays" | "cabs" | "packages" | "yatra" | "temples";

const tabs: ReadonlyArray<{
  id: SearchTab;
  label: string;
  icon: typeof BedDouble;
}> = [
  { id: "stays", label: "Stays", icon: BedDouble },
  { id: "cabs", label: "Cabs", icon: CarFront },
  { id: "packages", label: "Packages", icon: Compass },
  { id: "yatra", label: "Complete yatra", icon: MapPin },
  { id: "temples", label: "Temple guide", icon: Search },
];

const tabContent: Record<
  SearchTab,
  { action: string; destination: string; route: string }
> = {
  stays: {
    action: "Find stays",
    destination: "Where would you like to stay?",
    route: "/stays",
  },
  cabs: {
    action: "Find cabs",
    destination: "Drop or sightseeing area",
    route: "/transport",
  },
  packages: {
    action: "View packages",
    destination: "Choose a Braj circuit",
    route: "/packages",
  },
  yatra: {
    action: "Plan yatra",
    destination: "Choose your main destination",
    route: "/plan",
  },
  temples: {
    action: "Find temples",
    destination: "Search by temple or place",
    route: "/search",
  },
};

export function HomeSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>("stays");
  const [startingCity, setStartingCity] = useState("");
  const [destination, setDestination] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [travellers, setTravellers] = useState(2);
  const [seniors, setSeniors] = useState(0);
  const [mobilitySupport, setMobilitySupport] = useState(false);
  const [error, setError] = useState("");
  const content = tabContent[activeTab];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (arrival && departure && departure < arrival) {
      setError("Return date cannot be before the arrival date.");
      return;
    }

    if (seniors > travellers) {
      setError("Senior travellers cannot be more than total travellers.");
      return;
    }

    const params = new URLSearchParams();
    if (startingCity.trim()) params.set("from", startingCity.trim());
    if (destination.trim()) {
      params.set(
        activeTab === "temples" ? "q" : "destination",
        destination.trim(),
      );
    }
    if (arrival) params.set("arrival", arrival);
    if (departure) params.set("departure", departure);
    params.set("travellers", String(travellers));
    if (seniors) params.set("seniors", String(seniors));
    if (mobilitySupport) params.set("mobility", "required");
    if (activeTab === "temples") params.set("category", "temple");

    setError("");
    const query = params.toString();
    router.push((content.route + (query ? "?" + query : "")) as never);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 mx-auto -mt-24 w-[min(calc(100%-2rem),80rem)] rounded-[1.75rem] border border-white/80 bg-white p-3 shadow-[0_28px_70px_rgba(56,42,22,.16)] sm:p-5"
    >
      <div
        className="flex [scrollbar-width:none] gap-1 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Search services"
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={"home-search-tab-" + id}
            type="button"
            role="tab"
            aria-controls="home-search-panel"
            aria-selected={activeTab === id}
            onClick={() => {
              setActiveTab(id);
              setError("");
            }}
            className={cn(
              "focus-visible:outline-primary inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
              activeTab === id
                ? "bg-charcoal text-white"
                : "text-muted hover:bg-sand hover:text-charcoal",
            )}
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div
        id="home-search-panel"
        className="mt-2 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.1fr_1.1fr_1.25fr_1fr_auto]"
        role="tabpanel"
        aria-labelledby={"home-search-tab-" + activeTab}
      >
        <FieldShell icon={MapPin} label="Starting city">
          <input
            value={startingCity}
            onChange={(event) => setStartingCity(event.target.value)}
            className="placeholder:text-charcoal/70 w-full bg-transparent text-sm font-bold outline-none"
            placeholder="City or arrival point"
            aria-label="Starting city"
          />
        </FieldShell>

        <FieldShell icon={Compass} label="Braj destination">
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="placeholder:text-charcoal/70 w-full bg-transparent text-sm font-bold outline-none"
            placeholder={content.destination}
            aria-label="Braj destination"
          />
        </FieldShell>

        <FieldShell icon={CalendarDays} label="Travel dates">
          <div className="grid grid-cols-2 gap-2">
            <label className="min-w-0">
              <span className="sr-only">Arrival date</span>
              <input
                type="date"
                value={arrival}
                onChange={(event) => {
                  setArrival(event.target.value);
                  if (departure && event.target.value > departure)
                    setDeparture("");
                }}
                className="w-full min-w-0 bg-transparent text-xs font-bold outline-none"
              />
            </label>
            <label className="min-w-0 border-l pl-2">
              <span className="sr-only">Return date</span>
              <input
                type="date"
                value={departure}
                min={arrival || undefined}
                onChange={(event) => setDeparture(event.target.value)}
                className="w-full min-w-0 bg-transparent text-xs font-bold outline-none"
              />
            </label>
          </div>
        </FieldShell>

        <FieldShell icon={UsersRound} label="Travellers">
          <div className="grid grid-cols-2 gap-2">
            <NumberField
              label="Total"
              value={travellers}
              min={1}
              max={20}
              onChange={setTravellers}
            />
            <NumberField
              label="Seniors"
              value={seniors}
              min={0}
              max={travellers}
              onChange={setSeniors}
            />
          </div>
        </FieldShell>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-deep inline-flex min-h-16 items-center justify-center gap-2 rounded-xl px-6 font-extrabold whitespace-nowrap text-white transition-colors md:col-span-2 xl:col-span-1"
        >
          <Search size={20} aria-hidden="true" /> {content.action}
        </button>
      </div>

      <div className="text-muted mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-xs font-semibold">
        <span>Senior-friendly planning</span>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={mobilitySupport}
            onChange={(event) => setMobilitySupport(event.target.checked)}
            className="accent-primary size-4"
          />
          Mobility support needed
        </label>
        <span>Hindi assistance</span>
        <span>Transparent budget selection</span>
      </div>
      <p
        className="mt-2 min-h-4 px-1 text-xs font-semibold text-red-700"
        role="alert"
      >
        {error}
      </p>
    </form>
  );
}

function FieldShell({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream/40 focus-within:border-primary focus-within:ring-primary/15 flex min-h-16 items-center gap-3 rounded-xl border px-4 transition focus-within:ring-4">
      <Icon
        className="text-primary-deep shrink-0"
        size={20}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <span className="text-muted mb-1 block text-xs font-bold tracking-wide uppercase">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex min-w-0 items-center gap-1 text-xs font-bold">
      <span className="text-muted">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange(
            Number.isFinite(next) ? Math.min(max, Math.max(min, next)) : min,
          );
        }}
        className="min-w-0 flex-1 bg-transparent text-right outline-none"
        aria-label={label + " travellers"}
      />
    </label>
  );
}
