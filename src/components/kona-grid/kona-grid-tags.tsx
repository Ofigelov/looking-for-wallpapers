import React, { useMemo, useContext } from 'react';
import { nanoid } from 'nanoid';
import { FilterContext } from 'components/filter/filter-service';
import { KonaGridTagsBase } from 'components/kona-grid/kona-grid-tags.base';

export const KonaGridTags = (): JSX.Element => {
    const { items } = useContext(FilterContext);
    const id = useMemo(() => nanoid(10), [items]);
    const tags = useMemo(
        () => [...new Set(items.map((item) => item.tags.split(' ')).flat())],
        [items]
    );

    return <KonaGridTagsBase tags={tags} id={id} />;
};
