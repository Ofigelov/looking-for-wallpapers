import React from 'react';
import { KonaPost } from 'components/kona-image/types';

export const KonaImage = ({
    preview_url,
    preview_height,
    preview_width,
    tags,
}: IKonaImage): JSX.Element => {
    return (
        <div className="kona-image">
            <img
                className="lazyload"
                data-src={preview_url}
                loading="lazy"
                alt={tags}
                width={preview_width}
                height={preview_height}
            />
        </div>
    );
};

type IKonaImage = KonaPost;
