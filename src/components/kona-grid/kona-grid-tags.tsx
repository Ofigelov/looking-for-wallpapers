import React, { useMemo, useContext } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { FilterContext } from 'components/filter/filter-service';

export const KonaGridTags = (): JSX.Element => {
    const { items, appliedFilters, setFilter } = useContext(FilterContext);
    const filterTags = useMemo(() => new Set(appliedFilters.tags || []), [appliedFilters]);
    const id = useMemo(() => nanoid(10), [items]);
    const tags = useMemo(
        () => [...new Set(items.map((item) => item.tags.split(' ')).flat())],
        [items]
    );

    const onClick = (tag: string) => {
        if (filterTags.has(tag)) {
            filterTags.delete(tag);
        } else {
            filterTags.add(tag);
        }

        setFilter({ tags: [...filterTags] });
    };

    return (
        <ul className="kona-grid-tags">
            {tags.map((tag, index) => (
                <li className="kona-grid-tags__item" key={`${id}_${index}`}>
                    <button
                        className={cn('kona-grid-tags__btn', { 'is-active': filterTags.has(tag) })}
                        onClick={() => onClick(tag)}
                        type="button"
                    >
                        {tag}
                    </button>
                </li>
            ))}
        </ul>
    );
};
