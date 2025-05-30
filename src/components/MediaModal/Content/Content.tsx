import { MediaGridItem } from "../../MediaGrid";

import styles from "./styles.module.scss";

export type ContentProps = MediaGridItem;

const VideoElement = (props: MediaGridItem) => {
  return (
    <video
      src={props.main.url}
      autoPlay
      loop
      className={styles.video}
      controls
      onPlay={(event) => {
        (event.target as HTMLVideoElement).volume = 0.1;
      }}
    />
  );
};

const ImageElement = (props: MediaGridItem) => {
  return (
    <img
      className={styles.image}
      src={props.main.url}
      width={props.main.width}
      height={props.main.height}
    />
  );
};

export const Content = (props: ContentProps) => {
  const isVideo = props.main.url.match(/\.mp4$|\.mkv$|\.webm$/);

  if (isVideo) {
    return <VideoElement {...props} />;
  }

  return <ImageElement {...props} />;
};
