import { type RulePost, type RuleRepository, ruleRepository } from "../../api";
import { PostsStore } from "../PostsStore";
import { searchParamsStore } from "../SearchParamsStore";

export const createRulePostsStore = () =>
  new PostsStore<RulePost, RuleRepository>(ruleRepository, searchParamsStore);
