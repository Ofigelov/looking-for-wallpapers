import React, { useContext, useMemo } from 'react';
import { FilterContext } from 'components/filter/filter-service';

export const LoadMore = (): JSX.Element | null => {
    const {
        setFilter,
        items,
        appliedFilters: { limit = 1 },
        pagination: { currentPage },
    } = useContext(FilterContext);

    const onClick = () => {
        setFilter({ page: currentPage + 1 }, true);
    };

    const isHided = useMemo(() => items.length < currentPage * limit, [items]);

    if (isHided) return null;

    return (
        <button className="btn-primary" type="button" onClick={onClick}>
            Load more
        </button>
    );
};
