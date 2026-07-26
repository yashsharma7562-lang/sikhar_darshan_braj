import { Compass } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchExplorer } from "@/components/search/search-explorer";
import { searchRepository } from "@/features/search/repository";
export const metadata: Metadata = {
  title: "Search Braj",
  description:
    "Search verification-aware temples and destinations across Braj in English or Hindi.",
};
export default async function SearchPage() {
  const documents = await searchRepository.listDocuments();
  return (
    <>
      <section className="bg-sand/60 border-b py-14">
        <div className="container-shell">
          <p className="text-primary-deep flex items-center gap-2 text-sm font-extrabold tracking-[.2em] uppercase">
            <Compass size={17} />
            Unified pilgrimage search
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Find your next Braj stop.
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg leading-8">
            Search in English, Hindi or familiar alternative spellings.
            Operational claims remain tied to verification state.
          </p>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="container-shell py-12" role="status">
            <div className="bg-sand h-20 animate-pulse rounded-2xl" />
            <span className="sr-only">Loading search</span>
          </div>
        }
      >
        <SearchExplorer documents={documents} />
      </Suspense>
    </>
  );
}
