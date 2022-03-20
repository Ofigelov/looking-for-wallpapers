interface IObject {
    [key: string]: any;
}

export const removeEmptyKeys = (obj: IObject) =>
    Object.keys(obj).forEach((key) => {
        if (
            obj[key] === '' ||
            obj[key] === null ||
            obj[key] === undefined ||
            (typeof obj[key] === 'object' && Array.isArray(obj[key]) && !obj[key].length)
        ) {
            delete obj[key];
        }
    });
