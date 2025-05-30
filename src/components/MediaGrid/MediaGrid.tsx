import { MouseEventHandler } from "react";
import styles from "./styles.module.scss";
import { Spinner } from "../Spinner";
import { GridMedia, GridMediaProps } from "../GridMedia";
import { Button } from "../Button";
import cn from "classnames";

export type MediaGridItem = Omit<GridMediaProps, "onTagClick">;

export type MediaGridProps = {
  items: MediaGridItem[];
  isLoading: boolean;
  isEndReached: boolean;
  fetchMore: () => void;
  isError?: boolean;
  onTagClick: GridMediaProps["onTagClick"];
  onMediaClick?: (item: MediaGridItem) => void;
};

export const MediaGrid = ({
  isError,
  isEndReached,
  isLoading,
  items,
  fetchMore,
  onTagClick,
  onMediaClick,
}: MediaGridProps) => (
  <div className={styles.wrapper}>
    {isError && <div className={styles.wrapper__error}>Fetching error!</div>}
    <ul className={styles.wrapper__list}>
      {items.map((item, index) => {
        const handleClick: MouseEventHandler | undefined = onMediaClick
          ? (event) => {
              event.preventDefault();
              onMediaClick(item);
            }
          : undefined;
        return (
          <li className={styles.wrapper__item} key={`${index}_${item.id}`}>
            <GridMedia
              onTagClick={onTagClick}
              onClick={handleClick}
              {...item}
            />
          </li>
        );
      })}
    </ul>
    <Spinner
      className={cn(styles.wrapper__spinner, {
        [styles["wrapper__spinner--initial"]]: isLoading && !items.length,
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
