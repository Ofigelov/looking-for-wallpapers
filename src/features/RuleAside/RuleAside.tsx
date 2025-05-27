import { RuleAppliedTags } from "../RuleAppliedTags";
import { RuleFavoriteTags } from "../RuleFavoriteTags";
import { RuleTagsCloud } from "../RuleTagsCloud";

export const RuleAside = () => {
  return (
    <>
      <RuleAppliedTags />
      <RuleFavoriteTags />
      <RuleTagsCloud />
    </>
  );
};
