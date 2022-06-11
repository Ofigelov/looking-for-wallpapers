export interface IObject {
    [key: string]: null | undefined | string | number | string[] | boolean;
}

export const paramsToQuery = (params: IObject) => {
    let _query = '';
    const join = (name: string, value: string | boolean | number) => {
        _query += `${_query.length ? '&' : ''}${name}=${value}`;
    };
    Object.entries(params).forEach(([key, val]) => {
        if (val && typeof val === 'object' && val.length > 0) {
            const res = val.join('+');
            join(key, decodeURIComponent(res));
            return;
        }
        if (val) {
            join(key, val.toString());
        }
    });
    return _query;
};
