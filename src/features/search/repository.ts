import { destinations, temples } from "@/features/temples/data/catalogue";
import {
  editDistance,
  expandSearchTerms,
  normalizeSearchText,
} from "./normalization";
import type {
  SearchDocument,
  SearchFilters,
  SearchRepository,
  SearchResponse,
} from "./types";

const documents: readonly SearchDocument[] = [
  ...temples.map((temple) => ({
    id: temple.id,
    category: "temple" as const,
    title: temple.name,
    subtitle: `${temple.locality} • Schedule unverified`,
    description: temple.summary,
    href: `/temples/${temple.slug}`,
    keywords: [
      temple.name,
      ...temple.alternativeNames,
      temple.locality,
      "temple",
      "mandir",
    ],
    destination: temple.destinationSlug,
    verification:
      temple.verificationStatus === "verified"
        ? ("verified" as const)
        : ("pending" as const),
    accessibility: "unknown" as const,
  })),
  ...destinations.map((destination) => ({
    id: `destination-${destination.slug}`,
    category: "destination" as const,
    title: destination.name,
    subtitle: `${destination.region} destination`,
    description: destination.summary,
    href: `/destinations/${destination.slug}`,
    keywords: [
      destination.name,
      destination.region,
      "Braj",
      "Brij",
      "destination",
      "yatra",
    ],
    destination: destination.slug,
    verification: "not-applicable" as const,
    accessibility: "not-applicable" as const,
  })),
];

class LocalSearchRepository implements SearchRepository {
  async listDocuments() {
    return documents;
  }
  async search(query: string, filters: SearchFilters) {
    return searchDocuments(documents, query, filters);
  }
}

export function searchDocuments(
  source: readonly SearchDocument[],
  query: string,
  filters: SearchFilters,
): SearchResponse {
  const normalizedQuery = normalizeSearchText(query);
  const expandedTerms = expandSearchTerms(query);
  const hits = source
    .filter(
      (document) =>
        filters.categories.length === 0 ||
        filters.categories.includes(document.category),
    )
    .filter(
      (document) =>
        !filters.destination || document.destination === filters.destination,
    )
    .filter(
      (document) =>
        !filters.verificationOnly || document.verification === "verified",
    )
    .map((document) => scoreDocument(document, normalizedQuery, expandedTerms))
    .filter((hit) => normalizedQuery.length === 0 || hit.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.document.title.localeCompare(right.document.title),
    );
  return { hits, total: hits.length, normalizedQuery, expandedTerms };
}
function scoreDocument(
  document: SearchDocument,
  normalizedQuery: string,
  terms: readonly string[],
) {
  if (!normalizedQuery) return { document, score: 1, matchedTerms: [] };
  const title = normalizeSearchText(document.title);
  const haystack = normalizeSearchText(
    [
      document.title,
      document.subtitle,
      document.description,
      ...document.keywords,
    ].join(" "),
  );
  const words = haystack.split(" ");
  const matched = terms.filter(
    (term) =>
      haystack.includes(term) ||
      words.some(
        (word) =>
          term.length >= 4 &&
          editDistance(word, term) <= (term.length >= 7 ? 2 : 1),
      ),
  );
  const exactTitle =
    title === normalizedQuery ? 100 : title.includes(normalizedQuery) ? 40 : 0;
  return {
    document,
    score: exactTitle + matched.length * 6,
    matchedTerms: matched,
  };
}
export const searchRepository: SearchRepository = new LocalSearchRepository();
