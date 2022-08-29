import './index.scss';
import React, { useMemo } from 'react';
import { KonaPost } from 'components/kona-image/types';
import { useDefaultTags } from 'components/kona-grid/kona-grid-tags.base';

export const KonaImage = ({
    preview_url,
    preview_height,
    preview_width,
    tags,
    jpeg_width,
    jpeg_height,
    jpeg_url,
}: IKonaImage): JSX.Element => {
    const _tags = useMemo(() => tags.split(' '), []);
    const [onClick] = useDefaultTags();
    return (
        <article className="kona-image">
            <a
                className="kona-image__inner"
                href={jpeg_url}
                download
                target="_blank"
                rel="noreferrer noopener"
                title={tags}
            >
                <img
                    className="lazyload"
                    data-src={preview_url}
                    loading="lazy"
                    alt={tags}
                    width={preview_width}
                    height={preview_height}
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
            <div className="kona-image__size">{`${jpeg_width} x ${jpeg_height}`}</div>
        </article>
    );
};

type IKonaImage = KonaPost;
