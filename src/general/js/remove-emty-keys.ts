type Object = {
  [key: string]: unknown;
};

export const removeEmptyKeys = (obj: Object) =>
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
