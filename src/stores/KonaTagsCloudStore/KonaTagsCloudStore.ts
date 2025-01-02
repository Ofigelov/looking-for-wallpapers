import { computed, makeObservable } from "mobx";
import { countBy, sortBy } from "remeda";
import { TagsStore } from "../TagsStore";
import { createKonaPostsStore } from "../KonaPostsStore";
import { searchParamsStore } from "../SearchParamsStore";

const TypedTagsStore = TagsStore<ReturnType<typeof createKonaPostsStore>>;

export class KonaTagsCloudStore extends TypedTagsStore {
  constructor(
    ...tagsStoreParams: ConstructorParameters<typeof TypedTagsStore>
  ) {
    super(...tagsStoreParams);
    makeObservable(this, { tags: computed });
  }

  public get tags() {
    const rawTags = this._postsStore.data
      ?.map((post) => post.tags.split(" "))
      .flat(1);
    const counts = countBy(rawTags, (tag) => tag);

    const set = new Set(rawTags);

    return sortBy<string[]>((tag) => -counts[tag])([...set.values()]);
  }
}

export const createKonaTagsCloudStore = () =>
  new KonaTagsCloudStore(createKonaPostsStore(), searchParamsStore);
