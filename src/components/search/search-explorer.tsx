"use client";

import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  Landmark,
  List,
  Map,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { searchDocuments } from "@/features/search/repository";
import type { SearchCategory, SearchDocument } from "@/features/search/types";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list" | "map";
const pageSize = 6;
const categoryOptions: readonly { value: SearchCategory; label: string }[] = [
  { value: "temple", label: "Temples" },
  { value: "destination", label: "Destinations" },
  { value: "stay", label: "Stays" },
  { value: "package", label: "Packages" },
  { value: "transport", label: "Transport" },
  { value: "festival", label: "Festivals" },
  { value: "route", label: "Routes" },
];

export function SearchExplorer({
  documents,
}: {
  documents: readonly SearchDocument[];
}) {
  const urlParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const initialQuery = urlParams.get("q") ?? "";
  const initialCategory = urlParams.get("category");
  const validInitialCategory = categoryOptions.some(
    (option) => option.value === initialCategory,
  )
    ? (initialCategory as SearchCategory)
    : null;
  const [draft, setDraft] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [categories, setCategories] = useState<readonly SearchCategory[]>(
    validInitialCategory ? [validInitialCategory] : [],
  );
  const [destination, setDestination] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<"relevance" | "name">("relevance");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const response = useMemo(
    () =>
      searchDocuments(documents, query, {
        categories,
        destination: destination || null,
        verificationOnly: verifiedOnly,
      }),
    [documents, query, categories, destination, verifiedOnly],
  );
  const sorted = useMemo(
    () =>
      sort === "name"
        ? [...response.hits].sort((left, right) =>
            left.document.title.localeCompare(right.document.title),
          )
        : response.hits,
    [response.hits, sort],
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);
  const availableDestinations = [
    ...new Set(documents.map((document) => document.destination)),
  ].sort();
  const activeFilterCount =
    categories.length + (destination ? 1 : 0) + (verifiedOnly ? 1 : 0);
  function submit(event: FormEvent) {
    event.preventDefault();
    const next = draft.trim();
    setQuery(next);
    setPage(1);
    if (next) {
      const recent = readRecentSearches();
      localStorage.setItem(
        "shikhar-darshan:recent-searches",
        JSON.stringify(
          [next, ...recent.filter((value) => value !== next)].slice(0, 5),
        ),
      );
    }
    const params = new URLSearchParams(urlParams.toString());
    if (next) params.set("q", next);
    else params.delete("q");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function toggleCategory(category: SearchCategory) {
    setCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
    setPage(1);
  }
  function clearFilters() {
    setCategories([]);
    setDestination("");
    setVerifiedOnly(false);
    setPage(1);
  }
  function saveSearch() {
    localStorage.setItem(
      "shikhar-darshan:saved-search",
      JSON.stringify({
        query,
        categories,
        destination,
        verifiedOnly,
        savedAt: new Date().toISOString(),
      }),
    );
    setSaved(true);
  }
  const filters = (
    <FilterPanel
      categories={categories}
      destination={destination}
      verifiedOnly={verifiedOnly}
      destinations={availableDestinations}
      onToggle={toggleCategory}
      onDestination={setDestination}
      onVerified={setVerifiedOnly}
      onClear={clearFilters}
    />
  );
  return (
    <div className="container-shell py-10">
      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-[1.5rem] border bg-white p-3 shadow-sm sm:flex-row"
      >
        <div className="flex min-h-13 flex-1 items-center gap-3 px-3">
          <Search className="text-primary" />
          <label htmlFor="global-search" className="sr-only">
            Search Braj
          </label>
          <input
            id="global-search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Try ‘Bihari Ji’, ‘Goverdhan’ or ‘ब्रज’"
            className="h-full min-w-0 flex-1 bg-transparent text-base outline-none"
          />
        </div>
        <button className="bg-primary min-h-13 rounded-xl px-7 font-extrabold text-white">
          Search
        </button>
      </form>
      <p className="text-muted mt-4 flex items-center gap-2 text-xs font-semibold">
        <Sparkles size={15} className="text-temple-gold" />
        Understands Brij/Braj, Goverdhan/Govardhan, Bihari Ji and Devanagari
        terms.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr]">
        <aside className="hidden lg:block">{filters}</aside>
        <main>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-5">
            <div>
              <p className="font-black">{response.total} results</p>
              <p className="text-muted mt-1 text-xs">
                Only catalogue-backed records are shown.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border bg-white px-3 font-bold lg:hidden"
              >
                <SlidersHorizontal size={18} />
                Filters
                {activeFilterCount ? (
                  <span className="bg-primary rounded-full px-2 text-xs text-white">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>
              <select
                aria-label="Sort results"
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as "relevance" | "name")
                }
                className="min-h-11 rounded-xl border bg-white px-3 text-sm font-bold"
              >
                <option value="relevance">Most relevant</option>
                <option value="name">Name A–Z</option>
              </select>
              <div className="hidden rounded-xl border bg-white p-1 sm:flex">
                {[
                  ["grid", Grid2X2],
                  ["list", List],
                  ["map", Map],
                ].map(([mode, Icon]) => {
                  const ModeIcon = Icon as typeof Grid2X2;
                  return (
                    <button
                      key={mode as string}
                      type="button"
                      onClick={() => setView(mode as ViewMode)}
                      aria-label={`${mode} view`}
                      aria-pressed={view === mode}
                      className={cn(
                        "grid size-9 place-items-center rounded-lg",
                        view === mode ? "bg-charcoal text-white" : "text-muted",
                      )}
                    >
                      <ModeIcon size={17} />
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={saveSearch}
                className="text-peacock-deep grid size-11 place-items-center rounded-xl border bg-white"
                aria-label="Save search on this device"
              >
                <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
          {saved ? (
            <p role="status" className="text-success mt-3 text-sm font-bold">
              Saved on this device. Account sync is not enabled yet.
            </p>
          ) : null}
          {view === "map" ? (
            <MapView documents={visible.map((hit) => hit.document)} />
          ) : visible.length ? (
            <div
              className={cn(
                "mt-6 grid gap-4",
                view === "grid"
                  ? "sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1",
              )}
            >
              {visible.map(({ document }) => (
                <ResultCard
                  key={document.id}
                  document={document}
                  compact={view === "list"}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              query={query}
              onClear={() => {
                setDraft("");
                setQuery("");
                clearFilters();
              }}
            />
          )}
          {sorted.length > pageSize ? (
            <nav
              className="mt-8 flex items-center justify-center gap-3"
              aria-label="Result pages"
            >
              <button
                disabled={page === 1}
                onClick={() => setPage((value) => value - 1)}
                className="grid size-11 place-items-center rounded-xl border bg-white disabled:opacity-40"
              >
                <ChevronLeft />
              </button>
              <span className="text-sm font-bold">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((value) => value + 1)}
                className="grid size-11 place-items-center rounded-xl border bg-white disabled:opacity-40"
              >
                <ChevronRight />
              </button>
            </nav>
          ) : null}
        </main>
      </div>
      {filtersOpen ? (
        <div
          className="bg-charcoal/45 fixed inset-0 z-[80] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Search filters"
        >
          <div className="bg-cream absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black">Filter results</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="grid size-11 place-items-center rounded-xl border bg-white"
                aria-label="Close filters"
              >
                <X />
              </button>
            </div>
            {filters}
            <button
              onClick={() => setFiltersOpen(false)}
              className="bg-primary mt-6 min-h-12 w-full rounded-xl font-extrabold text-white"
            >
              Show {response.total} results
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function readRecentSearches(): readonly string[] {
  try {
    const stored = JSON.parse(
      localStorage.getItem("shikhar-darshan:recent-searches") ?? "[]",
    ) as unknown;
    return Array.isArray(stored)
      ? stored.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

interface FilterProps {
  categories: readonly SearchCategory[];
  destination: string;
  verifiedOnly: boolean;
  destinations: readonly string[];
  onToggle: (value: SearchCategory) => void;
  onDestination: (value: string) => void;
  onVerified: (value: boolean) => void;
  onClear: () => void;
}
function FilterPanel(props: FilterProps) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-black">Filters</h2>
        <button
          onClick={props.onClear}
          className="text-primary-deep text-xs font-bold"
        >
          Clear all
        </button>
      </div>
      <fieldset className="mt-6">
        <legend className="text-sm font-black">Category</legend>
        <div className="mt-3 space-y-2">
          {categoryOptions.map((option) => (
            <label
              key={option.value}
              className="flex min-h-10 items-center gap-3 text-sm font-semibold"
            >
              <input
                type="checkbox"
                checked={props.categories.includes(option.value)}
                onChange={() => props.onToggle(option.value)}
                className="accent-peacock size-4"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <label
        htmlFor="destination-filter"
        className="mt-6 block text-sm font-black"
      >
        Destination
      </label>
      <select
        id="destination-filter"
        value={props.destination}
        onChange={(event) => props.onDestination(event.target.value)}
        className="mt-3 min-h-11 w-full rounded-xl border bg-white px-3 text-sm"
      >
        <option value="">All destinations</option>
        {props.destinations.map((item) => (
          <option key={item} value={item}>
            {item.replaceAll("-", " ")}
          </option>
        ))}
      </select>
      <label className="mt-6 flex items-start gap-3 text-sm font-semibold">
        <input
          type="checkbox"
          checked={props.verifiedOnly}
          onChange={(event) => props.onVerified(event.target.checked)}
          className="accent-peacock mt-1 size-4"
        />
        <span>
          Verified information only
          <span className="text-muted mt-1 block text-xs font-normal">
            Excludes temple records awaiting review.
          </span>
        </span>
      </label>
    </div>
  );
}
function ResultCard({
  document,
  compact,
}: {
  document: SearchDocument;
  compact: boolean;
}) {
  const Icon = document.category === "temple" ? Landmark : MapPin;
  return (
    <article
      className={cn(
        "flex rounded-2xl border bg-white p-5",
        compact ? "items-center gap-5" : "flex-col",
      )}
    >
      <span className="bg-sand text-primary-deep grid size-11 shrink-0 place-items-center rounded-xl">
        <Icon size={21} />
      </span>
      <div className={compact ? "min-w-0 flex-1" : "mt-5"}>
        <span className="bg-peacock/10 text-peacock-deep rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase">
          {document.category}
        </span>
        <h2 className="mt-3 text-lg font-black">{document.title}</h2>
        <p className="text-muted mt-1 text-xs font-semibold">
          {document.subtitle}
        </p>
        <p className="text-muted mt-3 text-sm leading-6">
          {document.description}
        </p>
      </div>
      <Link
        href={document.href}
        className={cn(
          "bg-charcoal inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-extrabold text-white",
          compact ? "shrink-0" : "mt-5",
        )}
      >
        View details
      </Link>
    </article>
  );
}
function MapView({ documents }: { documents: readonly SearchDocument[] }) {
  const groups = documents.reduce<Record<string, number>>(
    (result, document) => ({
      ...result,
      [document.destination]: (result[document.destination] ?? 0) + 1,
    }),
    {},
  );
  return (
    <div className="mt-6 min-h-[420px] rounded-[1.5rem] border bg-[#EAF2F3] p-8 text-center">
      <Map className="text-peacock mx-auto" size={48} />
      <h2 className="mt-4 text-xl font-black">Destination grouping</h2>
      <p className="text-muted mt-2 text-sm">
        A geographic map activates only after verified coordinates and the
        restricted Maps key are configured.
      </p>
      <div className="mx-auto mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
        {Object.entries(groups).map(([name, count]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-xl bg-white p-4 text-left"
          >
            <span className="font-bold capitalize">
              {name.replaceAll("-", " ")}
            </span>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 rounded-[1.5rem] border border-dashed bg-white p-10 text-center">
      <Search className="text-muted mx-auto" size={40} />
      <h2 className="mt-4 text-xl font-black">No catalogue-backed results</h2>
      <p className="text-muted mt-2 text-sm">
        {query
          ? `Nothing matched “${query}” with these filters.`
          : "No records match the selected filters."}
      </p>
      <button
        onClick={onClear}
        className="bg-charcoal mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-5 font-extrabold text-white"
      >
        <Check size={17} />
        Clear search and filters
      </button>
    </div>
  );
}
