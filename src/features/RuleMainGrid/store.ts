import { computed, makeObservable } from "mobx";
import { createRulePostsStore } from "../../stores";
import { InfiniteStatusesStore } from "../../utils";
import { MediaGridItem } from "../../components/MediaGrid";
import {
  createSelectedItemStore,
  SelectedItemStore,
} from "../../stores/SelectedItemStore";

export class UIStore extends InfiniteStatusesStore {
  constructor(
    private readonly _postsStore: ReturnType<typeof createRulePostsStore>,
    private readonly _selectedItemsStore: SelectedItemStore<MediaGridItem>,
  ) {
    super(_postsStore);
    makeObservable(this, { items: computed });
  }

  public get toggleTag() {
    return this._postsStore.toggleTag;
  }

  public get isModalActive() {
    return this._selectedItemsStore.isSelected;
  }

  public select = (item: MediaGridItem) => {
    this._selectedItemsStore.select(item);
  };

  public unselect = () => {
    this._selectedItemsStore.unselect();
  };

  public get selected() {
    return this._selectedItemsStore.selectedItem;
  }

  public get items(): MediaGridItem[] {
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

export const createUIStore = () =>
  new UIStore(createRulePostsStore(), createSelectedItemStore());
