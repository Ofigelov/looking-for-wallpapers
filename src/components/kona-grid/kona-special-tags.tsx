import React, { useContext, useMemo } from 'react';
import { IUseTags, KonaGridTagsBase } from 'components/kona-grid/kona-grid-tags.base';
import { nanoid } from 'nanoid';
import { FilterContext } from 'components/filter/filter-service';

const useTags: IUseTags = (tags = []) => {
    const { appliedFilters, setFilter } = useContext(FilterContext);
    const filterTags = useMemo(() => new Set(appliedFilters.tags || []), [appliedFilters]);

    return [
        (tag: string) => {
            tags.forEach((_tag) => {
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

export const KonaSpecialTags = ({ tags, title }: IKonaSpecialTags): JSX.Element => {
    const id = useMemo(() => nanoid(10), []);
    return (
        <div>
            <h3>{title}</h3>
            <KonaGridTagsBase id={id} useTags={useTags} tags={tags} />
        </div>
    );
};

interface IKonaSpecialTags {
    title: string;
    tags: string[];
}
