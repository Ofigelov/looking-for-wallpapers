import { type SearchParamsService } from "@ofigelov/mobx-search-params-service";

export type FiltersParams = {
  tags?: string[];
};

export type PostsSearchParamsService = SearchParamsService<FiltersParams>;
