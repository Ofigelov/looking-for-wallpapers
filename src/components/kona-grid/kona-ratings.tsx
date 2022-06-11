import React, { useContext, useMemo } from 'react';
import { IUseTags, KonaGridTagsBase } from 'components/kona-grid/kona-grid-tags.base';
import { nanoid } from 'nanoid';
import { FilterContext } from 'components/filter/filter-service';

const ratings = ['safe', 'questionableless', 'questionable', 'questionableplus', 'explicit'].map(
    (tag) => `rating:${tag}`
);

const useTags: IUseTags = () => {
    const { appliedFilters, setFilter } = useContext(FilterContext);
    const filterTags = useMemo(() => new Set(appliedFilters.tags || []), [appliedFilters]);

    return [
        (tag: string) => {
            ratings.forEach((_tag) => {
                if (tag === _tag && !filterTags.has(tag)) {
                    filterTags.add(tag);
                    return;
                }
                filterTags.delete(_tag);
            });


            setFilter({ tags: [...filterTags] });
        },
        filterTags,
    ];
};

export const KonaRatings = (): JSX.Element => {
    const id = useMemo(() => nanoid(10), []);
    return (
        <div>
            <h3>Ratings</h3>
            <KonaGridTagsBase id={id} useTags={useTags} tags={ratings} />
        </div>
    );
};
