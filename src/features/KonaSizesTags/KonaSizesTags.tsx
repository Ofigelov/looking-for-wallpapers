import { observer } from "mobx-react-lite";
import { TagsGrid } from "../../components";
import { sizes } from "./constants.ts";
import { useMemo } from "react";
import { createKonaTagsCloudStore } from "../../stores";

export const KonaSizesTags = observer(() => {
  const store = useMemo(createKonaTagsCloudStore, []);
  return (
    <TagsGrid
      title="Sizes"
      tags={sizes}
      onTagClick={store.toggleTag}
      appliedTags={store.appliedTags}
    />
  );
});
