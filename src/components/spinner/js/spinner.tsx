import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

const Spinner = ({
    isActive,
    withOverlay,
    className,
    size = 50,
    ...props
}: iSpinner): JSX.Element => (
    <div className={classnames(className, 'spinner', { 'is-active': isActive })} {...props}>
        {withOverlay && <div className="spinner__overlay" />}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${size}px`}
            height={`${size}px`}
            viewBox="0 0 23 23"
            className="spinner__icon"
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
                className="circle"
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

interface iSpinner extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isActive: boolean;
    withOverlay?: boolean;
}

export { Spinner };
