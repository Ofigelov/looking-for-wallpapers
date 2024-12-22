interface IObject {
  [key: string]: unknown;
}

export const removeEmptyKeys = (obj: IObject) =>
  Object.keys(obj).forEach((key) => {
    if (
      obj[key] === "" ||
      obj[key] === null ||
      obj[key] === undefined ||
      (typeof obj[key] === "object" &&
        Array.isArray(obj[key]) &&
        !obj[key].length)
    ) {
      delete obj[key];
    }
  });
