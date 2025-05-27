import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { createRuleTagsCloudStore } from "../../stores";
import { TagsGrid } from "../../components";

export const RuleAppliedTags = observer(() => {
  const store = useMemo(createRuleTagsCloudStore, []);

  return (
    <TagsGrid
      tags={store.appliedTags}
      appliedTags={store.appliedTags}
      title="Applied Tags"
      onTagClick={store.toggleTag}
    />
  );
});
