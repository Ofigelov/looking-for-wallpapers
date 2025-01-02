import styles from "./styles.module.scss";
import { Button } from "../Button";
import cn from "classnames";
import { tagsDictionary } from "./constants.ts";

type TagsGridProps = {
  tags: string[];
  appliedTags?: string[];
  onTagClick: (tag: string) => void;
  title: string;
};

export const TagsGrid = ({
  tags,
  appliedTags,
  onTagClick,
  title,
}: TagsGridProps) => (
  <section className={styles.wrapper}>
    <h3>{title}</h3>
    <ul className={styles.wrapper__list}>
      {tags.map((tag, index) => (
        <li className={styles.wrapper__item} key={`${index}_${tag}`}>
          <Button
            className={cn(styles.wrapper__btn, {
              [styles.isActive]: appliedTags?.includes(tag),
            })}
            onClick={() => onTagClick(tag)}
            title={tag}
          >
            {tagsDictionary[tag] ?? tag}
          </Button>
        </li>
      ))}
    </ul>
  </section>
);
