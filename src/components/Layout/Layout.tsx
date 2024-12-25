import styles from "./styles.module.scss";
import { ReactNode } from "react";

type LayoutProps = {
  aside: ReactNode;
  main: ReactNode;
  header: ReactNode;
};

export const Layout = ({ main, aside, header }: LayoutProps) => (
  <div className={styles.wrapper}>
    <header className={styles.wrapper__header}>{header}</header>
    <aside className={styles.wrapper__aside}>{aside}</aside>
    <main className={styles.wrapper__main}>{main}</main>
  </div>
);
