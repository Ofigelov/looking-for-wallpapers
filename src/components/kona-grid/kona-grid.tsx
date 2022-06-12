import React, { useContext } from 'react';
import { KonaImage } from 'components/kona-image/kona-image';
import { FilterContext } from 'components/filter/filter-service';
import { Spinner } from 'components/spinner/js/spinner';
import { LoadMore } from 'components/kona-grid/load-more';
import { KonaGridTags } from 'components/kona-grid/kona-grid-tags';
import { KonaGridSearch } from 'components/kona-grid/kona-grid-search';
import { KonaRatings } from 'components/kona-grid/kona-ratings';
import { KonaAppliedTags } from 'components/kona-grid/kona-applied-tags';
import { KonaSizes } from 'components/kona-grid/kona-sizes';

export const KonaGrid = (): JSX.Element => {
    const { items, isLoading } = useContext(FilterContext);
    return (
        <div className="kona-grid">
            <div className="kona-grid__filters">
                <KonaAppliedTags />
                <KonaGridSearch />
                <KonaSizes />
                <KonaRatings />
                <KonaGridTags />
            </div>
            <ul className="kona-grid__list">
                {items.map((item, index) => (
                    <li className="kona-grid__item" key={`${index}_${item.id}`}>
                        <KonaImage {...item} />
                    </li>
                ))}
            </ul>
            <Spinner className="kona-grid__spinner" isActive={isLoading} withOverlay />
            {!isLoading && (
                <div className="kona-grid__load-more">
                    <LoadMore />
                </div>
            )}
        </div>
    );
};
