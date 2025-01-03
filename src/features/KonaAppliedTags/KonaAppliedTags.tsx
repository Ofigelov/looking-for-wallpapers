import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { createKonaTagsCloudStore } from "../../stores";
import { TagsGrid } from "../../components";

export const KonaAppliedTags = observer(() => {
  const store = useMemo(createKonaTagsCloudStore, []);

  return (
    <TagsGrid
      tags={store.appliedTags}
      appliedTags={store.appliedTags}
      title="Applied Tags"
      onTagClick={store.toggleTag}
    />
  );
});
