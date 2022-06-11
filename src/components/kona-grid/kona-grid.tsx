import React, { useContext } from 'react';
import { KonaImage } from 'components/kona-image/kona-image';
import { FilterContext } from 'components/filter/filter-service';
import { Spinner } from 'components/spinner/js/spinner';
import { LoadMore } from 'components/kona-grid/load-more';
import { KonaGridTags } from 'components/kona-grid/kona-grid-tags';
import { KonaGridSearch } from 'components/kona-grid/kona-grid-search';

export const KonaGrid = (): JSX.Element => {
    const { items, isLoading } = useContext(FilterContext);
    console.log(items[0]?.id);
    return (
        <div className="kona-grid">
            <div className="kona-grid__filters">
                <KonaGridSearch />
                <KonaGridTags />
            </div>
            <ul className="kona-grid__list">
                {items.map((item, index) => (
                    <li className="kona-grid__item" key={`${index}_${item.id}`}>
                        <KonaImage {...item} />
                    </li>
                ))}
            </ul>
            <Spinner className="kona-grid__spinner" isActive={isLoading} />
            {!isLoading && (
                <div className="kona-grid__load-more">
                    <LoadMore />
                </div>
            )}
        </div>
    );
};
