import { MouseEventHandler, useMemo } from "react";
import styles from "./styles.module.scss";

type ImageProps = {
  url: string;
  height: number;
  width: number;
};

export type GridMediaProps = {
  id: number;
  preview: ImageProps;
  main: ImageProps;
  tags: string | string[];
  onTagClick: (tage: string) => void;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const GridMedia = ({
  preview,
  main,
  tags,
  onTagClick,
  onClick,
}: GridMediaProps) => {
  const optimizedTags = useMemo(
    () => (Array.isArray(tags) ? tags : tags.split(" ")),
    [tags],
  );
  return (
    <article className={styles.wrapper}>
      <a
        className={styles.wrapper__inner}
        href={main.url}
        download
        target="_blank"
        rel="noreferrer noopener"
        title={tags.toString()}
        onClick={onClick}
      >
        <img
          className="lazyload"
          src={preview.url}
          loading="lazy"
          alt={tags.toString()}
          width={preview.width}
          height={preview.height}
        />
      </a>
      <ul className={styles.wrapper__tags}>
        {optimizedTags.map((tag, index) => (
          <li key={index + tag}>
            <button
              className={styles.wrapper__tag}
              type="button"
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <div
        className={styles.wrapper__size}
      >{`${main.width} x ${main.height}`}</div>
    </article>
  );
};
