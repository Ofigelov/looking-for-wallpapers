import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { createRuleTagsCloudStore } from "../../stores";
import { TagsGrid } from "../../components";

export const RuleTagsCloud = observer(() => {
  const store = useMemo(createRuleTagsCloudStore, []);
  return (
    <TagsGrid
      tags={store.tags}
      appliedTags={store.appliedTags}
      onTagClick={store.toggleTag}
      title="Tags cloud"
    />
  );
});
