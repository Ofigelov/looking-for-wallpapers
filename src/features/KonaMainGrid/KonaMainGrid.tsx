import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { MediaGrid } from "../../components";
import { createUIStore } from "./store.ts";

export const KonaMainGrid = observer(() => {
  const store = useMemo(createUIStore, []);

  return (
    <MediaGrid
      items={store.items}
      isLoading={store.isLoading}
      isEndReached={store.isEndReached}
      fetchMore={store.fetchMore}
      onTagClick={store.toggleTag}
    />
  );
});
