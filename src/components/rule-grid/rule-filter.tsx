import React from 'react';
import { FilterService } from 'components/filter/filter-service';
import { RuleGrid } from 'components/rule-grid/rule-grid';

const ROOT_ENDPOINT = 'https://api.rule34.xxx/index.php';

export const RuleFilter = (): JSX.Element => {
    return (
        <FilterService
            endpoint={`${ROOT_ENDPOINT}`}
            initialFilters={{ tags: ['lazyprocrastinator'] }}
            requiredParams={{ json: 1, limit: 500, page: 'dapi', s: 'post', q: 'index' }}
            takeFirstFromApi
        >
            <RuleGrid />
        </FilterService>
    );
};
