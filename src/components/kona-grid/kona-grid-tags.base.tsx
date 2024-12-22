import { useContext, useMemo } from "react";
import cn from "classnames";
import { FilterContext } from "../filter/filter-service";
import { getTagsName } from "./tags-dictionary";
import styles from "./kona-grid-tags.module.scss";

export type IUseTags = (
  tags?: string[],
) => [(tag: string) => void, Set<string>];

export const useDefaultTags: IUseTags = () => {
  const { appliedFilters, setFilter } = useContext(FilterContext);
  const filterTags = useMemo(
    () => new Set(appliedFilters.tags || []),
    [appliedFilters],
  );

  return [
    (tag: string) => {
      const _filterTags = new Set(appliedFilters.tags || []);
      if (_filterTags.has(tag)) {
        _filterTags.delete(tag);
      } else {
        _filterTags.add(tag);
      }

      setFilter({ tags: [..._filterTags] });
    },
    filterTags,
  ];
};

export const KonaGridTagsBase = ({
  tags,
  id,
  useTags = useDefaultTags,
}: IKonaGridTagsBase) => {
  const [onClick, filterTags] = useTags(tags);

  return (
    <ul className={styles.konaGridTags}>
      {tags.map((tag, index) => (
        <li className={styles.konaGridTags__item} key={`${id}_${index}`}>
          <button
            className={cn(styles.konaGridTags__btn, {
              [styles.isActive]: filterTags.has(tag),
            })}
            onClick={() => onClick(tag)}
            type="button"
            title={tag}
          >
            {getTagsName(tag)}
          </button>
        </li>
      ))}
    </ul>
  );
};

interface IKonaGridTagsBase {
  id: string;
  tags: string[];
  useTags?: IUseTags;
}
