import { useMemo } from "react";
import styles from "./kona-image.module.scss";
import { KonaPost } from "./types";
import { useDefaultTags } from "../kona-grid/kona-grid-tags.base";

export const KonaImage = ({
  preview_url,
  preview_height,
  preview_width,
  tags,
  jpeg_width,
  jpeg_height,
  jpeg_url,
}: IKonaImage) => {
  const _tags = useMemo(() => tags.split(" "), []);
  const [onClick] = useDefaultTags();
  return (
    <article className={styles.wrapper}>
      <a
        className={styles.wrapper__inner}
        href={jpeg_url}
        download
        target="_blank"
        rel="noreferrer noopener"
        title={tags}
      >
        <img
          className="lazyload"
          src={preview_url}
          loading="lazy"
          alt={tags}
          width={preview_width}
          height={preview_height}
        />
      </a>
      <ul className={styles.wrapper__tags}>
        {_tags.map((tag, index) => (
          <li key={index + tag}>
            <button
              className={styles.wrapper__tag}
              type="button"
              onClick={() => onClick(tag)}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <div
        className={styles.wrapper__size}
      >{`${jpeg_width} x ${jpeg_height}`}</div>
    </article>
  );
};

type IKonaImage = KonaPost;
