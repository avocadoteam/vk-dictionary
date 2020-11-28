export type SearchResult = {
  id: string;
  definition: string;
  plainDefinition: string;
};

export type FavSearchResult = SearchResult & {
  name: string;
};
