import { computed, makeObservable } from "mobx";
import { createKonaPostsStore } from "../../stores";
import { InfiniteStatusesStore } from "../../utils";
import { ImagesGridItem } from "../../components/ImagesGrid";

export class UIStore extends InfiniteStatusesStore {
  constructor(
    private readonly _postsStore: ReturnType<typeof createKonaPostsStore>,
  ) {
    super(_postsStore);
    makeObservable(this, { items: computed });
  }

  public get toggleTag() {
    return this._postsStore.toggleTag;
  }

  public get items(): ImagesGridItem[] {
    return this._postsStore.data?.map(
      ({
        tags,
        jpeg_height,
        jpeg_width,
        jpeg_url,
        id,
        preview_height,
        preview_width,
        preview_url,
      }) => ({
        tags: tags.split(" "),
        main: {
          url: jpeg_url,
          height: jpeg_height,
          width: jpeg_width,
        },
        id,
        preview: {
          url: preview_url,
          height: preview_height,
          width: preview_width,
        },
      }),
    );
  }
}

export const createUIStore = () => new UIStore(createKonaPostsStore());
