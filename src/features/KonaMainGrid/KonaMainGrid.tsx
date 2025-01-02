import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { ImagesGrid } from "../../components/ImagesGrid";
import { createUIStore } from "./store.ts";

export const KonaMainGrid = observer(() => {
  const store = useMemo(createUIStore, []);

  return (
    <ImagesGrid
      items={store.items}
      isLoading={store.isLoading}
      isEndReached={store.isEndReached}
      fetchMore={store.fetchMore}
      onTagClick={store.toggleTag}
    />
  );
});
