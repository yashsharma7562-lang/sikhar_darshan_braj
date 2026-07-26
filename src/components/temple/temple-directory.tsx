"use client";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { TempleRecord } from "@/features/temples/types";
import { TempleCard } from "./temple-card";
export function TempleDirectory({
  temples,
}: {
  temples: readonly TempleRecord[];
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return term
      ? temples.filter((temple) =>
          [temple.name, temple.locality, ...temple.alternativeNames].some(
            (value) => value.toLocaleLowerCase().includes(term),
          ),
        )
      : temples;
  }, [query, temples]);
  return (
    <>
      <div className="flex max-w-2xl items-center gap-3 rounded-2xl border bg-white p-3">
        <Search className="text-muted ml-2" aria-hidden="true" />
        <label htmlFor="temple-search" className="sr-only">
          Search temples
        </label>
        <input
          id="temple-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by temple, alternative name or destination"
          className="min-h-11 flex-1 bg-transparent outline-none"
        />
      </div>
      <p className="text-muted mt-4 text-sm font-semibold" aria-live="polite">
        {results.length} {results.length === 1 ? "temple" : "temples"} found
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {results.map((temple) => (
          <TempleCard key={temple.id} temple={temple} />
        ))}
      </div>
      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed p-8 text-center">
          <h2 className="font-black">No matching temple profile</h2>
          <p className="text-muted mt-2 text-sm">
            Try another name, spelling or destination.
          </p>
        </div>
      ) : null}
    </>
  );
}
