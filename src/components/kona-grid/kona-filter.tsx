import React from 'react';
import { FilterService } from 'components/filter/filter-service';
import { KonaGrid } from 'components/kona-grid/kona-grid';

export const KonaFilter = (): JSX.Element => {
    return (
        <FilterService
            endpoint="http://localhost:8010/posts"
            initialFilters={{ tags: ['rating:safe'] }}
            requiredParams={{ limit: 100 }}
            takeFirstFromApi
        >
            <KonaGrid />
        </FilterService>
    );
};
