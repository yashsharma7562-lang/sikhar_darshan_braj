export type SearchCategory =
  | "temple"
  | "destination"
  | "stay"
  | "package"
  | "transport"
  | "festival"
  | "route";
export interface SearchDocument {
  readonly id: string;
  readonly category: SearchCategory;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly href: string;
  readonly keywords: readonly string[];
  readonly destination: string;
  readonly verification: "verified" | "pending" | "not-applicable";
  readonly accessibility: "verified" | "unknown" | "not-applicable";
}
export interface SearchFilters {
  readonly categories: readonly SearchCategory[];
  readonly destination: string | null;
  readonly verificationOnly: boolean;
}
export interface SearchHit {
  readonly document: SearchDocument;
  readonly score: number;
  readonly matchedTerms: readonly string[];
}
export interface SearchResponse {
  readonly hits: readonly SearchHit[];
  readonly total: number;
  readonly normalizedQuery: string;
  readonly expandedTerms: readonly string[];
}
export interface SearchRepository {
  search(query: string, filters: SearchFilters): Promise<SearchResponse>;
  listDocuments(): Promise<readonly SearchDocument[]>;
}
