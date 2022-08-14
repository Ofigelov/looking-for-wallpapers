import React, { useMemo, useState, useContext, FormEvent, useEffect } from 'react';
import { FilterContext } from 'components/filter/filter-service';

export const RuleGridSearch = (): JSX.Element => {
    const { appliedFilters, setFilter } = useContext(FilterContext);
    const filterTags = useMemo(() => new Set(appliedFilters.tags || []), [appliedFilters]);
    const [searchedTags, setSearchedTags] = useState<string[]>([]);
    const [value, setValue] = useState('');

    const choose = (text: string) => {
        setValue('');
        if (filterTags.has(text)) return;
        setFilter({ tags: [text, ...filterTags] });
        setSearchedTags([...searchedTags, text]);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formattedValue = value.replace(/\s/g, '_').toLowerCase();
        choose(formattedValue);
    };

    useEffect(() => {
        const isAllHere = searchedTags.some((item: string) => !filterTags.has(item));
        if (!isAllHere)
            setSearchedTags(searchedTags.filter((item: string) => filterTags.has(item)));
    }, [appliedFilters]);

    return (
        <article className="kona-grid-search">
            <h3>Search</h3>
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
        </article>
    );
};
