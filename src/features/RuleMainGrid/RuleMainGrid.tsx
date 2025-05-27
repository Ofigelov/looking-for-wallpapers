import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { ImagesGrid } from "../../components";
import { createUIStore } from "./store.ts";

export const RuleMainGrid = observer(() => {
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
