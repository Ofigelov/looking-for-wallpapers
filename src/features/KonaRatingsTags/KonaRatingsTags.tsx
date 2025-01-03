import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { createKonaTagsCloudStore } from "../../stores";
import { TagsGrid } from "../../components";
import { ratings } from "./constants";

export const KonaRatingsTags = observer(() => {
  const store = useMemo(createKonaTagsCloudStore, []);
  return (
    <TagsGrid
      title="Ratings"
      onTagClick={store.toggleTag}
      tags={ratings}
      appliedTags={store.appliedTags}
    />
  );
});
