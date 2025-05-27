import { StoreFactory } from "@ofigelov/storefactory";
import { type KonaPost, type KonaRepository, konaRepository } from "../../api";
import { PostsStore } from "../PostsStore";
import { searchParamsStore } from "../SearchParamsStore";

const factory = new StoreFactory(PostsStore<KonaPost, KonaRepository>);

export const createKonaPostsStore = () =>
  factory.getSingleInstance(konaRepository, searchParamsStore);
