import styles from "./styles.module.scss";
import { Button } from "../Button";
import { tagsDictionary } from "./constants.ts";

type TagsGridProps = {
  tags?: string[];
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
      {tags?.map((tag, index) => (
        <li className={styles.wrapper__item} key={`${index}_${tag}`}>
          <Button
            className={styles.wrapper__btn}
            isSelected={appliedTags?.includes(tag)}
            onClick={() => onTagClick(tag)}
            title={tag}
          >
            {tagsDictionary[tag] ?? tag}
          </Button>
        </li>
      ))}
      {(!tags || tags.length === 0) && "no tags to show"}
    </ul>
  </section>
);
