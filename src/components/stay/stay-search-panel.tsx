"use client";
import {
  Accessibility,
  CalendarDays,
  MapPin,
  Search,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

export function StaySearchPanel() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <>
      <form
        className="rounded-[1.5rem] border bg-white p-4 shadow-sm"
        method="get"
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
          <Field icon={MapPin} label="Braj destination">
            <select name="destination" defaultValue="">
              <option value="">All destinations</option>
              <option value="vrindavan">Vrindavan</option>
              <option value="mathura">Mathura</option>
              <option value="govardhan">Govardhan</option>
              <option value="barsana">Barsana</option>
            </select>
          </Field>
          <Field icon={CalendarDays} label="Check-in">
            <input name="checkIn" type="date" />
          </Field>
          <Field icon={CalendarDays} label="Check-out">
            <input name="checkOut" type="date" />
          </Field>
          <Field icon={UsersRound} label="Guests">
            <select name="guests" defaultValue="2">
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5+ guests</option>
            </select>
          </Field>
          <button className="bg-primary inline-flex min-h-16 items-center justify-center gap-2 rounded-xl px-6 font-extrabold text-white">
            <Search size={19} />
            Search stays
          </button>
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((value) => !value)}
          aria-expanded={filtersOpen}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-bold"
        >
          <SlidersHorizontal size={17} />
          {filtersOpen ? "Hide filters" : "More filters"}
        </button>
        {filtersOpen ? (
          <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <Filter
              label="Property type"
              options={["Hotel", "Dharamshala", "Guest house", "Homestay"]}
            />
            <Filter
              label="Accessibility"
              options={[
                "Lift",
                "Ground-floor room",
                "Wheelchair access",
                "Accessible bathroom",
              ]}
            />
            <Filter
              label="Comfort"
              options={[
                "Air conditioning",
                "Hot water",
                "Parking",
                "Family rooms",
              ]}
            />
            <Filter
              label="Booking"
              options={[
                "Verified only",
                "Free cancellation",
                "Pay at property",
                "Instant confirmation",
              ]}
            />
          </div>
        ) : null}
      </form>
      <div className="bg-peacock/5 text-peacock-deep mt-4 flex items-start gap-3 rounded-xl p-4 text-sm">
        <Accessibility className="shrink-0" size={20} />
        <p>
          <strong>Accessibility details are evidence-based.</strong> Unknown
          facilities are never treated as available.
        </p>
      </div>
    </>
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
function Filter({
  label,
  options,
}: {
  label: string;
  options: readonly string[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-black">{label}</legend>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-9 items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              name="filter"
              value={option.toLowerCase().replaceAll(" ", "-")}
              className="accent-peacock"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
