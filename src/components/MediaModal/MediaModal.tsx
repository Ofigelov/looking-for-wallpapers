import { MediaGridItem } from "../MediaGrid";
import styles from "./styles.module.scss";
import { Content } from "./Content";

export type MediaModalProps = {
  selected?: MediaGridItem | null;
  isActive: boolean;
  onClose: () => void;
};

export const MediaModal = ({
  isActive,
  selected,
  onClose,
}: MediaModalProps) => {
  if (!isActive || !selected) {
    return null;
  }

  return (
    <div className={styles.wrapper} onClick={onClose}>
      <article
        className={styles.wrapper__content}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Content {...selected} />
      </article>
    </div>
  );
};
