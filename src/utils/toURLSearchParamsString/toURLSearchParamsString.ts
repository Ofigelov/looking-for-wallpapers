export const toURLSearchParamsString = <TData extends {}>(
  data: TData,
): string => new URLSearchParams(data).toString();
