import { type InfiniteQuery } from "@ofigelov/mobx-query";
import { type FiltersParams } from "../types.ts";

export abstract class PostsRepository<TData> {
  public abstract getPostsQuery: (
    params: FiltersParams,
  ) => InfiniteQuery<TData>;

  public abstract invalidatePostQuery: () => void;
}
