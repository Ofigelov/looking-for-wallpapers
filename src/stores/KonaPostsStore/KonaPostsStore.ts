import { StoreFactory } from "@ofigelov/storefactory";
import { nanoid } from "nanoid";
import { type KonaPost, type KonaRepository, konaRepository } from "../../api";
import { PostsStore } from "../PostsStore";
import { searchParamsStore } from "../SearchParamsStore";

const key = nanoid();

const factory = new StoreFactory(PostsStore<KonaPost, KonaRepository>);

export const createKonaPostsStore = () =>
  factory.getInstance(key, konaRepository, searchParamsStore);
