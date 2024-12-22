import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import styles from "./kona-grid-search.module.scss";
import { FilterContext } from "../filter/filter-service";
import { KonaPredictiveSearch } from "./kona-predictive-search";
import cn from "classnames";
import { Button } from "../Button";

export const KonaGridSearch = ({ predictiveEndpoint }: IKonaGridSearch) => {
  const { appliedFilters, setFilter } = useContext(FilterContext);
  const filterTags = useMemo(
    () => new Set(appliedFilters.tags || []),
    [appliedFilters],
  );
  const [searchedTags, setSearchedTags] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const choose = (text: string) => {
    setValue("");
    if (filterTags.has(text)) return;
    setFilter({ tags: [text, ...filterTags] });
    setSearchedTags([...searchedTags, text]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formattedValue = value.replace(/\s/g, "_").toLowerCase();
    choose(formattedValue);
  };

  useEffect(() => {
    const isAllHere = searchedTags.some(
      (item: string) => !filterTags.has(item),
    );
    if (!isAllHere)
      setSearchedTags(
        searchedTags.filter((item: string) => filterTags.has(item)),
      );
  }, [appliedFilters]);

  return (
    <article className={styles.wrapper}>
      <h3>Search</h3>
      <form className={styles.wrapper__form} onSubmit={onSubmit}>
        <KonaPredictiveSearch
          endpoint={predictiveEndpoint}
          value={value}
          choose={choose}
        >
          <input
            className={styles.wrapper__input}
            type="search"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
        </KonaPredictiveSearch>
        <Button className={cn(styles.wrapper__btn)} type="submit">
          add
        </Button>
      </form>
    </article>
  );
};

interface IKonaGridSearch {
  predictiveEndpoint: string;
}
