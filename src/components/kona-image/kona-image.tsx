import React from 'react';
import { KonaPost } from 'components/kona-image/types';

export const KonaImage = ({
    preview_url,
    preview_height,
    preview_width,
    tags,
    jpeg_width,
    jpeg_height,
    jpeg_url,
}: IKonaImage): JSX.Element => {
    return (
        <a
            href={jpeg_url}
            className="kona-image"
            download
            target="_blank"
            rel="noreferrer noopener"
        >
            <div className="kona-image__inner">
                <img
                    className="lazyload"
                    data-src={preview_url}
                    loading="lazy"
                    alt={tags}
                    width={preview_width}
                    height={preview_height}
                />
            </div>
            <div className="kona-image__size">{`${jpeg_width} x ${jpeg_height}`}</div>
        </a>
    );
};

type IKonaImage = KonaPost;
