import { useContext } from "react";
import { KonaImage } from "../kona-image/kona-image";
import { FilterContext } from "../filter/filter-service";
import { Spinner } from "../spinner/spinner.tsx";
import { LoadMore } from "./load-more";
import { KonaGridTags } from "./kona-grid-tags";
import { KonaGridSearch } from "./kona-grid-search";
import { KonaRatings } from "./kona-ratings";
import { KonaAppliedTags } from "./kona-applied-tags";
import { KonaSizes } from "./kona-sizes";
import styles from "./kona-grid.module.scss";

export const KonaGrid = ({ predictiveEndpoint }: IFilter) => {
  const { items, isLoading } = useContext(FilterContext);
  return (
    <div className={styles.konaGrid}>
      <div className={styles.konaGrid__filters}>
        <KonaAppliedTags />
        <KonaGridSearch predictiveEndpoint={predictiveEndpoint} />
        <KonaSizes />
        <KonaRatings />
        <KonaGridTags />
      </div>
      <ul className={styles.konaGrid__list}>
        {items.map((item, index) => (
          <li className={styles.konaGrid__item} key={`${index}_${item.id}`}>
            <KonaImage {...item} />
          </li>
        ))}
      </ul>
      <Spinner
        className={styles.konaGrid__spinner}
        isActive={isLoading}
        withOverlay
      />
      {!isLoading && (
        <div className={styles.konaGrid__loadMore}>
          <LoadMore />
        </div>
      )}
    </div>
  );
};

interface IFilter {
  predictiveEndpoint: string;
}
