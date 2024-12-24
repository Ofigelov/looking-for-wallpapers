import { SearchParamsService } from "@ofigelov/mobx-search-params-service";
import { FiltersParams } from "../../types.ts";

export const searchParamsStore = new SearchParamsService<FiltersParams>(
  new URLSearchParams(),
  () => {},
  {
    tags: (value) =>
      Array.isArray(value) && value.every((item) => typeof item === "string"),
  },
  {},
  new Set(),
);
