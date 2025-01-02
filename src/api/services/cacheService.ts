import { MobxQuery } from "@astral/mobx-query";

export const cacheService = new MobxQuery({
  enabledAutoFetch: true,
  fetchPolicy: "cache-first",
  onError: (e) => console.error(e),
});
