import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { MediaGrid } from "../../components";
import { createUIStore } from "./store.ts";
import { MediaModal } from "../../components/MediaModal";

export const RuleMainGrid = observer(() => {
  const store = useMemo(createUIStore, []);

  return (
    <>
      <MediaGrid
        items={store.items}
        isLoading={store.isLoading}
        isEndReached={store.isEndReached}
        fetchMore={store.fetchMore}
        onTagClick={store.toggleTag}
        onMediaClick={store.select}
      />
      <MediaModal
        isActive={store.isModalActive}
        selected={store.selected}
        onClose={store.unselect}
      />
    </>
  );
});
