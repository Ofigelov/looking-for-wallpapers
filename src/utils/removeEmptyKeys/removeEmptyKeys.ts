import { clone } from "remeda";

type Object = {
  [key: string]: unknown;
};

export const removeEmptyKeys = (obj: Object) => {
  const cloned = clone(obj);

  Object.keys(cloned).forEach((key) => {
    if (
      cloned[key] === "" ||
      cloned[key] === null ||
      cloned[key] === undefined ||
      (typeof cloned[key] === "object" &&
        Array.isArray(cloned[key]) &&
        !cloned[key].length)
    ) {
      delete cloned[key];
    }
  });

  return cloned;
};
