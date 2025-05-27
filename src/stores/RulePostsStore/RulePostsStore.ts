import { type RulePost, type RuleRepository, ruleRepository } from "../../api";
import { PostsStore } from "../PostsStore";
import { searchParamsStore } from "../SearchParamsStore";
import { StoreFactory } from "@ofigelov/storefactory";

const factory = new StoreFactory(PostsStore<RulePost, RuleRepository>);

export const createRulePostsStore = () =>
  factory.getSingleInstance(ruleRepository, searchParamsStore);
