import { type MobxQuery } from "@astral/mobx-query";
import { nanoid } from "nanoid";
import { type GetRulePostsQueryParams, type RulePost } from "./dto.ts";
import { toURLSearchParamsString } from "../../utils";
import { cacheService } from "../services";
import { PostsRepository } from "../types.ts";

const postsKey = nanoid();
const REQUIRED_PARAMS = {
  json: 1,
  page: "dapi",
  s: "post",
  q: "index",
};

export class RuleRepository extends PostsRepository<RulePost> {
  constructor(private readonly _cacheService: MobxQuery) {
    super();
  }

  public getPostsQuery = (params: GetRulePostsQueryParams) =>
    this._cacheService.createInfiniteQuery(
      [postsKey, params],
      ({ offset, count }): Promise<RulePost[]> =>
        fetch(
          `/index.php?${toURLSearchParamsString({
            ...REQUIRED_PARAMS,
            tags: params.tags,
            limit: count,
            pid: offset / count,
          })}`,
        ).then((response) => response.json()),
      {
        incrementCount: 100,
      },
    );

  public invalidatePostQuery = () => this._cacheService.invalidate([postsKey]);
}

export const ruleRepository = new RuleRepository(cacheService);
