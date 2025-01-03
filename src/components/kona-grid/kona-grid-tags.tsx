import { useContext, useMemo } from "react";
import { nanoid } from "nanoid";
import { FilterContext } from "../filter/filter-service";
import { KonaGridTagsBase } from "./kona-grid-tags.base";

export const KonaGridTags = () => {
  const { items } = useContext(FilterContext);
  const id = useMemo(() => nanoid(10), [items]);
  const tags = useMemo(
    () => [...new Set(items.map((item) => item.tags.split(" ")).flat())],
    [items],
  );

  return (
    <div>
      <h3>TagsCloud</h3>
      <KonaGridTagsBase tags={tags} id={id} />
    </div>
  );
};
