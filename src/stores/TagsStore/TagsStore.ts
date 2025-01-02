import { computed, makeObservable } from "mobx";
import type { PostsSearchParamsService } from "../../types";

export abstract class TagsStore<
  TPostsStore extends { toggleTag: (tag: string) => void },
> {
  constructor(
    protected readonly _postsStore: TPostsStore,
    private readonly _searchParamsService: PostsSearchParamsService,
  ) {
    makeObservable(this, { appliedTags: computed });
  }

  public abstract tags: string[];

  public get appliedTags() {
    return this._searchParamsService.data.tags;
  }

  public get toggleTag() {
    return this._postsStore.toggleTag;
  }
}
