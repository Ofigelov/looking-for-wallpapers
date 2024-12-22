import { useContext, useMemo } from "react";
import { FilterContext } from "../filter/filter-service";
import { KonaGridTagsBase } from "./kona-grid-tags.base";
import { nanoid } from "nanoid";

export const KonaAppliedTags = () => {
  const id = useMemo(() => nanoid(10), []);
  const {
    appliedFilters: { tags = [] },
  } = useContext(FilterContext);

  if (tags.length === 0) return null;

  return (
    <div>
      <h3>Applied tags</h3>
      <KonaGridTagsBase tags={tags} id={id} />
    </div>
  );
};
