export interface IObject {
    [key: string]: null | undefined | string | number | string[] | boolean;
}

export const paramsToQuery = (params: IObject) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
        if (val) query.append(key, val.toString());
    });
    return query;
};
