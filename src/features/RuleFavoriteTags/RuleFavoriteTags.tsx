import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { createRuleTagsCloudStore } from "../../stores";
import { TagsGrid } from "../../components";
import { tags } from "./constants";

export const RuleFavoriteTags = observer(() => {
  const store = useMemo(createRuleTagsCloudStore, []);
  return (
    <TagsGrid
      title="Favorite"
      onTagClick={store.toggleTag}
      tags={tags}
      appliedTags={store.appliedTags}
    />
  );
});
