import { HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => (
  <button
    type="button"
    {...props}
    className={cn(props.className, styles.wrapper)}
  />
);
