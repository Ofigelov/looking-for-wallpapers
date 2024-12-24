import { MobxQuery } from "@ofigelov/mobx-query";
import { nanoid } from "nanoid";
import { GetRulePostsQueryParams } from "./dto.ts";
import { toURLSearchParamsString } from "../../utils";
import { cacheService } from "../services";

const postsKey = nanoid();
const REQUIRED_PARAMS = {
  json: 1,
  page: "dapi",
  s: "post",
  q: "index",
};

export class RuleRepository {
  constructor(private readonly _cacheService: MobxQuery) {}

  public getPostsQuery = (params: GetRulePostsQueryParams) =>
    this._cacheService.createInfiniteQuery(
      [postsKey, params],
      ({ offset, count }) =>
        fetch(
          `/index.php?${toURLSearchParamsString({
            ...REQUIRED_PARAMS,
            tags: params.tags,
            limit: count,
            pid: offset / count,
          })}`,
        ).then((response) => response.json()),
    );

  public invalidatePostQuery = () => this._cacheService.invalidate([postsKey]);
}

export const ruleRepository = new RuleRepository(cacheService);
