export type SearchResult = {
  id: string;
  definition: string;
};

export type FavSearchResult = SearchResult & {
  name: string;
};
