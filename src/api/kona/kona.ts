import { type MobxQuery } from "@ofigelov/mobx-query";
import { cacheService } from "../services";
import { GetPostsQueryParams } from "./dto.ts";
import { nanoid } from "nanoid";
import { toURLSearchParamsString } from "../../utils";

const postsKey = nanoid();

class KonaRepository {
  constructor(private readonly _cacheService: MobxQuery) {}

  public getPostsQuery = (params: GetPostsQueryParams) =>
    this._cacheService.createInfiniteQuery(
      [postsKey, params],
      (inifiniteParams) =>
        fetch(
          `/post.json?${toURLSearchParamsString({ tags: params.tags, limit: inifiniteParams.count, page: inifiniteParams.offset || undefined })}`,
        ).then((response) => response.json()),
    );

  public invalidatePostQuery = () => this._cacheService.invalidate([postsKey]);
}

export const konaRepository = new KonaRepository(cacheService);
