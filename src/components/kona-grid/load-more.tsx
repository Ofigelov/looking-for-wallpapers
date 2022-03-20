import React, { useContext } from 'react';
import { FilterContext } from 'components/filter/filter-service';

export const LoadMore = (): JSX.Element => {
    const {
        setFilter,
        pagination: { currentPage },
    } = useContext(FilterContext);

    const onClick = () => {
        setFilter({ page: currentPage + 1 }, true);
    };

    return (
        <button className="btn-primary" type="button" onClick={onClick}>
            Load more
        </button>
    );
};
