import { computed, makeObservable } from "mobx";
import { createRulePostsStore } from "../../stores";
import { InfiniteStatusesStore } from "../../utils";
import { ImagesGridItem } from "../../components/ImagesGrid";

export class UIStore extends InfiniteStatusesStore {
  constructor(
    private readonly _postsStore: ReturnType<typeof createRulePostsStore>,
  ) {
    super(_postsStore);
    makeObservable(this, { items: computed });
  }

  public get toggleTag() {
    return this._postsStore.toggleTag;
  }

  public get items(): ImagesGridItem[] {
    return this._postsStore.data?.map(
      ({ tags, height, width, file_url, id, preview_url }) => ({
        tags: tags.split(" "),
        main: {
          url: file_url,
          height: height,
          width: width,
        },
        id,
        preview: {
          url: preview_url,
          height: height,
          width: width,
        },
      }),
    );
  }
}

export const createUIStore = () => new UIStore(createRulePostsStore());
