import { type MobxQuery } from "@astral/mobx-query";
import { cacheService } from "../services";
import { type GetPostsQueryParams, type KonaPost } from "./dto.ts";
import { nanoid } from "nanoid";
import { toURLSearchParamsString } from "../../utils";
import { PostsRepository } from "../types.ts";

const postsKey = nanoid();

export class KonaRepository extends PostsRepository<KonaPost> {
  constructor(private readonly _cacheService: MobxQuery) {
    super();
  }

  public getPostsQuery = (params: GetPostsQueryParams) =>
    this._cacheService.createInfiniteQuery(
      [postsKey, params],
      ({ count, offset }): Promise<KonaPost[]> =>
        fetch(
          `/post.json?${toURLSearchParamsString({
            tags: params.tags,
            limit: count,
            page: offset / count,
          })}`,
        ).then((response) => response.json()),
      {
        incrementCount: 100,
      },
    );

  public invalidatePostQuery = () => this._cacheService.invalidate([postsKey]);
}

export const konaRepository = new KonaRepository(cacheService);
