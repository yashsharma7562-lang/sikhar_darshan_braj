"use client";
import {
  Accessibility,
  AlertTriangle,
  CalendarDays,
  Check,
  LoaderCircle,
  MapPin,
  UsersRound,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import type { DraftItinerary } from "@/features/packages/types";
const destinationOptions = [
  ["mathura", "Mathura"],
  ["vrindavan", "Vrindavan"],
  ["govardhan", "Govardhan"],
  ["barsana", "Barsana"],
  ["nandgaon", "Nandgaon"],
  ["gokul", "Gokul"],
] as const;
export function YatraBuilder() {
  const [draft, setDraft] = useState<DraftItinerary | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setDraft(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/itineraries/draft", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        days: Number(form.get("days")),
        travellers: Number(form.get("travellers")),
        seniorCitizens: Number(form.get("seniorCitizens")),
        children: Number(form.get("children")),
        destinationSlugs: form.getAll("destinations"),
        walkingTolerance: form.get("walkingTolerance"),
        pace: form.get("pace"),
        wheelchairRequired: form.get("wheelchairRequired") === "on",
        budgetMinor: null,
        language: "en",
        avoidCrowds: form.get("avoidCrowds") === "on",
      }),
    });
    const body = (await response.json()) as
      DraftItinerary | { message: string };
    setLoading(false);
    if (!response.ok) {
      setError(
        "message" in body
          ? body.message
          : "The planning draft could not be created.",
      );
      return;
    }
    setDraft(body as DraftItinerary);
  }
  return (
    <div className="grid gap-8 lg:grid-cols-[23rem_1fr]">
      <form
        onSubmit={submit}
        className="h-fit rounded-[1.5rem] border bg-white p-5"
      >
        <h2 className="text-xl font-black">Your journey needs</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Field icon={CalendarDays} label="Days">
            <input
              name="days"
              type="number"
              min="1"
              max="30"
              defaultValue="3"
              required
            />
          </Field>
          <Field icon={UsersRound} label="Travellers">
            <input
              name="travellers"
              type="number"
              min="1"
              max="50"
              defaultValue="2"
              required
            />
          </Field>
          <Field icon={UsersRound} label="Seniors">
            <input
              name="seniorCitizens"
              type="number"
              min="0"
              max="50"
              defaultValue="0"
              required
            />
          </Field>
          <Field icon={UsersRound} label="Children">
            <input
              name="children"
              type="number"
              min="0"
              max="50"
              defaultValue="0"
              required
            />
          </Field>
        </div>
        <fieldset className="mt-6">
          <legend className="font-black">Preferred destinations</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {destinationOptions.map(([value, label]) => (
              <label
                key={value}
                className="flex min-h-10 items-center gap-2 text-sm font-semibold"
              >
                <input
                  type="checkbox"
                  name="destinations"
                  value={value}
                  className="accent-peacock"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-5 grid gap-4">
          <label className="text-sm font-black">
            Walking tolerance
            <select
              name="walkingTolerance"
              defaultValue="low"
              className="mt-2 min-h-11 w-full rounded-xl border bg-white px-3"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="text-sm font-black">
            Preferred pace
            <select
              name="pace"
              defaultValue="slow"
              className="mt-2 min-h-11 w-full rounded-xl border bg-white px-3"
            >
              <option value="slow">Slow</option>
              <option value="balanced">Balanced</option>
              <option value="active">Active</option>
            </select>
          </label>
          <label className="flex items-center gap-3 text-sm font-bold">
            <input
              type="checkbox"
              name="wheelchairRequired"
              className="accent-peacock"
            />
            <Accessibility size={18} />
            Wheelchair support required
          </label>
          <label className="flex items-center gap-3 text-sm font-bold">
            <input
              type="checkbox"
              name="avoidCrowds"
              className="accent-peacock"
            />
            Prefer lower-crowd planning
          </label>
        </div>
        <button
          disabled={loading}
          className="bg-primary mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl font-extrabold text-white disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            <MapPin size={18} />
          )}
          Create safe planning draft
        </button>
        {error ? (
          <p role="alert" className="text-error mt-3 text-sm font-bold">
            {error}
          </p>
        ) : null}
      </form>
      <div>
        {draft ? (
          <DraftView draft={draft} />
        ) : (
          <div className="grid min-h-[30rem] place-items-center rounded-[1.5rem] border border-dashed bg-white p-8 text-center">
            <div>
              <MapPin className="text-muted mx-auto" size={44} />
              <h2 className="mt-4 text-xl font-black">
                Your day-by-day scaffold will appear here
              </h2>
              <p className="text-muted mx-auto mt-2 max-w-lg text-sm leading-6">
                It will organise selected destinations and surface unresolved
                facts without inventing timings, routes or prices.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof CalendarDays;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="rounded-xl border p-3">
      <span className="text-muted flex items-center gap-2 text-xs font-extrabold">
        <Icon size={15} />
        {label}
      </span>
      <span className="mt-2 block [&>*]:w-full [&>*]:bg-transparent [&>*]:font-bold [&>*]:outline-none">
        {children}
      </span>
    </label>
  );
}
function DraftView({ draft }: { draft: DraftItinerary }) {
  return (
    <div className="space-y-5">
      <div className="border-warning/20 bg-warning/5 rounded-2xl border p-5">
        <div className="flex items-center gap-2 font-black text-[#8A4D00]">
          <AlertTriangle size={19} />
          Planning draft—not a confirmed itinerary
        </div>
        <ul className="text-muted mt-3 space-y-2 text-sm leading-6">
          {draft.warnings.map((warning) => (
            <li key={warning}>• {warning}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        {draft.effortTags.map((tag) => (
          <span
            key={tag}
            className="bg-peacock/10 text-peacock-deep rounded-full px-3 py-1 text-xs font-extrabold"
          >
            {tag.replaceAll("-", " ")}
          </span>
        ))}
      </div>
      {draft.days.map((day) => (
        <article key={day.day} className="rounded-[1.5rem] border bg-white p-6">
          <p className="text-primary-deep text-xs font-extrabold tracking-[.18em] uppercase">
            Day {day.day}
          </p>
          <h2 className="mt-2 text-xl font-black">
            {day.destinationSlugs.length
              ? day.destinationSlugs
                  .map((slug) => slug.replaceAll("-", " "))
                  .join(" • ")
              : "Rest and contingency"}
          </h2>
          <p className="text-muted mt-3 text-sm leading-6">
            {day.planningNote}
          </p>
          <div className="mt-5 border-t pt-4">
            <p className="text-muted text-xs font-black uppercase">
              Still to verify
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {day.unresolvedFacts.map((fact) => (
                <span
                  key={fact}
                  className="bg-sand inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                >
                  <Check size={13} />
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
