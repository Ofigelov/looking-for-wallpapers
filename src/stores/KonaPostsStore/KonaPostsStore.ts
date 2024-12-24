import { type KonaPost, type KonaRepository, konaRepository } from "../../api";
import { PostsStore } from "../PostsStore";
import { searchParamsStore } from "../SearchParamsStore";

export const createKonaPostsStore = () =>
  new PostsStore<KonaPost, KonaRepository>(konaRepository, searchParamsStore);
