import React, { useContext } from 'react';
import { FilterContext } from 'components/filter/filter-service';

export const RuleLoadMore = (): JSX.Element | null => {
    const { setFilter, items } = useContext(FilterContext);

    const onClick = () => {
        setFilter({ pid: items.length }, true);
    };

    return (
        <button className="btn-primary" type="button" onClick={onClick}>
            Load more
        </button>
    );
};
