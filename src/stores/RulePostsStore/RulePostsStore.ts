import { nanoid } from "nanoid";
import { type RulePost, type RuleRepository, ruleRepository } from "../../api";
import { PostsStore } from "../PostsStore";
import { searchParamsStore } from "../SearchParamsStore";
import { StoreFactory } from "@ofigelov/storefactory";

const key = nanoid();

const factory = new StoreFactory(PostsStore<RulePost, RuleRepository>);

export const createRulePostsStore = () =>
  factory.getInstance(key, ruleRepository, searchParamsStore);
