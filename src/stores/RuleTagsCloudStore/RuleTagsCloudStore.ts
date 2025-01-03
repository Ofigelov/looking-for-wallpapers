import { computed, makeObservable } from "mobx";
import { countBy, sortBy } from "remeda";
import { TagsStore } from "../TagsStore";
import { searchParamsStore } from "../SearchParamsStore";
import { createRulePostsStore } from "../RulePostsStore";

const typedTagsStore = TagsStore<ReturnType<typeof createRulePostsStore>>;

export class RuleTagsCloudStore extends typedTagsStore {
  constructor(
    ...tagsStoreParams: ConstructorParameters<typeof typedTagsStore>
  ) {
    super(...tagsStoreParams);
    makeObservable(this, { tags: computed });
  }

  public get tags() {
    const rawTags = this._postsStore.data?.map((post) => post.tags).flat(1);
    const counts = countBy(rawTags, (tag) => tag);

    const set = new Set(rawTags);

    return sortBy<string[]>((tag) => -counts[tag])([...set.values()]);
  }
}

export const createRuleTagsCloudStore = new RuleTagsCloudStore(
  createRulePostsStore(),
  searchParamsStore,
);
