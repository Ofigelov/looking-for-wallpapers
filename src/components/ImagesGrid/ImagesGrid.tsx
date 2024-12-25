import styles from "./styles.module.scss";
import { Spinner } from "../Spinner/Spinner.tsx";
import { GridImage, GridImageProps } from "../GridImage/GridImage.tsx";
import { Button } from "../Button";
import cn from "classnames";

type Item = Omit<GridImageProps, "onTagClick">;

export type ImagesGridProps = {
  items: Item[];
  isLoading: boolean;
  isEndReached: boolean;
  fetchMore: () => void;
  isError?: boolean;
  onTagClick: GridImageProps["onTagClick"];
};

export const ImagesGrid = ({
  isError,
  isEndReached,
  isLoading,
  items,
  fetchMore,
  onTagClick,
}: ImagesGridProps) => (
  <div className={styles.wrapper}>
    {isError && <div className={styles.wrapper__error}>Fetching error!</div>}
    <ul className={styles.wrapper__list}>
      {items.map((item, index) => (
        <li className={styles.konaGrid__item} key={`${index}_${item.id}`}>
          <GridImage onTagClick={onTagClick} {...item} />
        </li>
      ))}
    </ul>
    <Spinner
      className={cn(styles.wrapper__spinner, {
        [styles.wrapper__spinnerInitial]: isLoading && !items.length,
      })}
      isActive={isLoading}
      withOverlay
    />
    {!isLoading && !isEndReached && (
      <div className={styles.wrapper__loadMore}>
        <Button onClick={fetchMore}>Load more</Button>
      </div>
    )}
  </div>
);
