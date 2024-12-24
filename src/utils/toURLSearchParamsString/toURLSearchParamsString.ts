import { removeEmptyKeys } from "../removeEmptyKeys";

export const toURLSearchParamsString = <
  TData extends Record<string, undefined | string | string[] | number>,
>(
  data: TData,
): string =>
  new URLSearchParams(
    removeEmptyKeys(data) as Record<string, string>,
  ).toString();
