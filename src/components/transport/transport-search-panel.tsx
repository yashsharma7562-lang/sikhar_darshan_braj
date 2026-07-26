"use client";
import {
  Accessibility,
  CalendarDays,
  Clock3,
  Luggage,
  MapPin,
  Search,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
export function TransportSearchPanel() {
  const [journey, setJourney] = useState("one-way");
  return (
    <form
      method="get"
      className="rounded-[1.5rem] border bg-white p-4 shadow-sm"
    >
      <div
        className="mb-4 flex gap-1 overflow-x-auto"
        role="tablist"
        aria-label="Journey type"
      >
        {(
          [
            ["one-way", "One way"],
            ["round-trip", "Round trip"],
            ["local", "Local sightseeing"],
            ["multi-day", "Multi-day"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={journey === value}
            onClick={() => setJourney(value)}
            className={`min-h-11 shrink-0 rounded-xl px-4 text-sm font-bold ${journey === value ? "bg-charcoal text-white" : "bg-cream text-muted"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <input type="hidden" name="journeyType" value={journey} />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Field icon={MapPin} label="Pickup">
          <input
            name="pickup"
            required
            placeholder="Station, hotel or landmark"
          />
        </Field>
        <Field icon={MapPin} label="Drop">
          <input name="drop" required placeholder="Destination or stop" />
        </Field>
        <Field icon={CalendarDays} label="Date">
          <input name="date" type="date" required />
        </Field>
        <Field icon={Clock3} label="Pickup time">
          <input name="time" type="time" required />
        </Field>
        <Field icon={UsersRound} label="Passengers">
          <select name="passengers" defaultValue="2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option value="5">5+</option>
          </select>
        </Field>
        <Field icon={Luggage} label="Luggage">
          <select name="luggage" defaultValue="1">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option value="3">3+</option>
          </select>
        </Field>
        <label className="bg-cream/30 flex min-h-16 items-center gap-3 rounded-xl border px-4 text-sm font-bold">
          <input
            type="checkbox"
            name="senior"
            value="true"
            className="accent-peacock size-4"
          />
          Senior travellers
        </label>
        <label className="bg-cream/30 flex min-h-16 items-center gap-3 rounded-xl border px-4 text-sm font-bold">
          <Accessibility className="text-peacock" size={19} />
          <input
            type="checkbox"
            name="wheelchair"
            value="true"
            className="accent-peacock size-4"
          />
          Wheelchair request
        </label>
      </div>
      <button className="bg-primary mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl px-6 font-extrabold text-white">
        <Search size={19} />
        Find verified vehicles
      </button>
    </form>
  );
}
function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="bg-cream/30 flex min-h-16 items-center gap-3 rounded-xl border px-4">
      <Icon className="text-primary shrink-0" size={19} />
      <span className="min-w-0 flex-1">
        <span className="text-muted block text-xs font-extrabold tracking-wide uppercase">
          {label}
        </span>
        <span className="mt-1 block [&>*]:w-full [&>*]:bg-transparent [&>*]:font-bold [&>*]:outline-none">
          {children}
        </span>
      </span>
    </label>
  );
}
