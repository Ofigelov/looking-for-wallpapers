import React, { useMemo, useState, useContext, FormEvent, useEffect } from 'react';
import { FilterContext } from 'components/filter/filter-service';
import { KonaGridTagsBase } from 'components/kona-grid/kona-grid-tags.base';

export const KonaGridSearch = (): JSX.Element => {
    const { appliedFilters, setFilter } = useContext(FilterContext);
    const filterTags = useMemo(() => new Set(appliedFilters.tags || []), [appliedFilters]);
    const [searchedTags, setSearchedTags] = useState<string[]>([]);
    const [value, setValue] = useState('');
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formattedValue = value.replace(' ', '_').toLowerCase();
        setValue('');
        if (filterTags.has(formattedValue)) return;
        setFilter({ tags: [formattedValue, ...filterTags] });
        setSearchedTags([...searchedTags, formattedValue]);
    };

    useEffect(() => {
        const isAllHere = searchedTags.some((item: string) => !filterTags.has(item));
        if (!isAllHere)
            setSearchedTags(searchedTags.filter((item: string) => filterTags.has(item)));
    }, [appliedFilters]);

    return (
        <article className="kona-grid-search">
            <form className="kona-grid-search__form" onSubmit={onSubmit}>
                <input
                    className="kona-grid-search__input"
                    type="search"
                    value={value}
                    onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}
                />
                <button className="kona-grid-search__btn btn-primary" type="submit">
                    add
                </button>
            </form>
            <KonaGridTagsBase tags={searchedTags} id="search" />
        </article>
    );
};
