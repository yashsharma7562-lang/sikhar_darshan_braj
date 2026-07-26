import type {
  SearchDocument,
  SearchFilters,
  SearchRepository,
  SearchResponse,
} from "@/features/search/types";

export interface AlgoliaSearchClient {
  searchIndex(query: string, filters: SearchFilters): Promise<SearchResponse>;
}
export class AlgoliaSearchRepository implements SearchRepository {
  constructor(private readonly client: AlgoliaSearchClient) {}
  search(query: string, filters: SearchFilters) {
    return this.client.searchIndex(query, filters);
  }
  async listDocuments(): Promise<readonly SearchDocument[]> {
    throw new Error(
      "Algolia does not expose full index scans through the search repository.",
    );
  }
}
