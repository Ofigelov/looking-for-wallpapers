import React, { useMemo } from 'react';
import { KonaPost } from 'components/kona-image/types';
import { useDefaultTags } from 'components/kona-grid/kona-grid-tags.base';

export const RuleItem = ({
    height,
    width,
    file_url,
    tags,
    preview_url,
    onOpen,
}: IRuleImage): JSX.Element => {
    const _tags = useMemo(() => tags.split(' '), []);
    const [onClick] = useDefaultTags();
    return (
        <article className="kona-image">
            <a
                className="kona-image__inner"
                href={file_url}
                download
                target="_blank"
                rel="noreferrer noopener"
                title={tags}
                onClick={(e) => {
                    e.preventDefault();
                    onOpen(file_url);
                }}
            >
                <img
                    className="lazyload"
                    data-src={preview_url}
                    loading="lazy"
                    alt={tags}
                    width={height}
                    height={width}
                />
            </a>
            <ul className="kona-image__tags">
                {_tags.map((tag, index) => (
                    <li key={index + tag}>
                        <button
                            className="kona-image__tag"
                            type="button"
                            onClick={() => onClick(tag)}
                        >
                            {tag}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="kona-image__size">{`${width} x ${height}`}</div>
        </article>
    );
};

type IRuleImage = KonaPost & {
    onOpen: (url: string) => void;
};
