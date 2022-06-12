import React from 'react';
import { FilterService } from 'components/filter/filter-service';
import { KonaGrid } from 'components/kona-grid/kona-grid';

const ROOT_ENDPOINT = 'http://localhost:8010/api';

export const KonaFilter = (): JSX.Element => {
    return (
        <FilterService
            endpoint={`${ROOT_ENDPOINT}/post.json`}
            initialFilters={{ tags: ['rating:safe'] }}
            requiredParams={{ limit: 100 }}
            takeFirstFromApi
        >
            <KonaGrid predictiveEndpoint={`${ROOT_ENDPOINT}/tag.json`} />
        </FilterService>
    );
};
