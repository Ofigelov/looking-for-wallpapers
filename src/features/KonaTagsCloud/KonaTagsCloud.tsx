import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { createKonaTagsCloudStore } from "../../stores";
import { TagsGrid } from "../../components";

export const KonaTagsCloud = observer(() => {
  const store = useMemo(createKonaTagsCloudStore, []);
  return (
    <TagsGrid
      tags={store.tags}
      appliedTags={store.appliedTags}
      onTagClick={store.toggleTag}
      title="Tags cloud"
    />
  );
});
