import React, { useMemo, useContext } from 'react';
import cn from 'classnames';
import { FilterContext } from 'components/filter/filter-service';
import { getTagsName } from 'components/kona-grid/tags-dictionary';

export type IUseTags = (tags?: string[]) => [(tag: string) => void, Set<string>];

export const useDefaultTags: IUseTags = () => {
    const { appliedFilters, setFilter } = useContext(FilterContext);
    const filterTags = useMemo(() => new Set(appliedFilters.tags || []), [appliedFilters]);

    return [
        (tag: string) => {
            const _filterTags = new Set(appliedFilters.tags || []);
            if (_filterTags.has(tag)) {
                _filterTags.delete(tag);
            } else {
                _filterTags.add(tag);
            }

            setFilter({ tags: [..._filterTags] });
        },
        filterTags,
    ];
};

export const KonaGridTagsBase = ({
    tags,
    id,
    useTags = useDefaultTags,
}: IKonaGridTagsBase): JSX.Element => {
    const [onClick, filterTags] = useTags(tags);

    return (
        <ul className="kona-grid-tags">
            {tags.map((tag, index) => (
                <li className="kona-grid-tags__item" key={`${id}_${index}`}>
                    <button
                        className={cn('kona-grid-tags__btn', { 'is-active': filterTags.has(tag) })}
                        onClick={() => onClick(tag)}
                        type="button"
                        title={tag}
                    >
                        {getTagsName(tag)}
                    </button>
                </li>
            ))}
        </ul>
    );
};

interface IKonaGridTagsBase {
    id: string;
    tags: string[];
    useTags?: IUseTags;
}
