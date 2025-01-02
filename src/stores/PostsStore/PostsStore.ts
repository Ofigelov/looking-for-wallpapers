import { computed, makeObservable } from "mobx";
import { type PostsSearchParamsService } from "../../types.ts";
import { type PostsRepository } from "../../api";

export class PostsStore<TData, TRepo extends PostsRepository<TData>> {
  constructor(
    private readonly _repo: TRepo,
    private readonly _searchParamsService: PostsSearchParamsService,
  ) {
    makeObservable(this, {
      data: computed,
      isLoading: computed,
      isEndReached: computed,
    });
  }

  private get query() {
    return this._repo.getPostsQuery({
      tags: this._searchParamsService.data.tags,
    });
  }

  public get isLoading() {
    return this.query.isLoading;
  }

  public get data(): TData[] {
    return this.query.data ?? [];
  }

  public get isEndReached() {
    return this.query.isEndReached;
  }

  public fetchMore = () => {
    this.query.fetchMore();
  };

  public invalidate = () => {
    this._repo.invalidatePostQuery();
  };

  public toggleTag = (tag: string) => {
    if (this._searchParamsService.data?.tags?.includes(tag)) {
      const filtered = this._searchParamsService.data?.tags.filter(
        (tag) => tag !== tag,
      );
      this._searchParamsService.apply({ tags: filtered });
    } else {
      const combined = [...(this._searchParamsService.data?.tags ?? []), tag];
      this._searchParamsService.apply({
        tags: combined,
      });
    }
  };
}
