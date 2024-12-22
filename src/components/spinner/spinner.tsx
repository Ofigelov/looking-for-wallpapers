import { HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  isActive: boolean;
  withOverlay?: boolean;
};

export const Spinner = ({
  isActive,
  withOverlay,
  className,
  size = 50,
  ...props
}: SpinnerProps) => (
  <div
    className={classnames(className, styles.spinner, {
      [styles.isActive]: isActive,
    })}
    {...props}
  >
    {withOverlay && <div className={styles.spinner__overlay} />}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 23 23"
      className={styles.spinner__icon}
    >
      <circle
        cx="12"
        cy="12"
        strokeOpacity="0.4"
        strokeWidth="2"
        r="10"
        strokeDasharray="63"
      />
      <circle
        className={styles.spinner__circle}
        cx="12"
        cy="12"
        strokeWidth="2"
        r="10"
        strokeDasharray="63"
        strokeDashoffset="30"
        transform="rotate(-90 12 12)"
      />
    </svg>
  </div>
);
