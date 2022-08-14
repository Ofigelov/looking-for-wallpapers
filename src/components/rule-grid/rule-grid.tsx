import React, { useContext, useState } from 'react';
import { FilterContext } from 'components/filter/filter-service';
import { Spinner } from 'components/spinner/js/spinner';
import { KonaGridTags } from 'components/kona-grid/kona-grid-tags';
import { KonaAppliedTags } from 'components/kona-grid/kona-applied-tags';
import { RuleItem } from 'components/rule-item/rule-item';
import { RuleGridSearch } from 'components/rule-grid/rule-grid-search';
import { RuleLoadMore } from 'components/rule-grid/rule-load-more';
import { RuleFavorite } from 'components/rule-grid/rule-favorits';
import { RuleModal } from 'components/rule-modal/rule-modal';

export const RuleGrid = (): JSX.Element => {
    const { items, isLoading } = useContext(FilterContext);
    const [activeItem, setActiveItem] = useState('');

    const onOpen = (url: string) => setActiveItem(url);

    const onClose = () => setActiveItem('');

    return (
        <div className="kona-grid">
            <RuleModal onClose={onClose} isActive={activeItem !== ''} videoUrl={activeItem} />
            <div className="kona-grid__filters">
                <KonaAppliedTags />
                <RuleGridSearch />
                <RuleFavorite />
                <KonaGridTags />
            </div>
            <ul className="kona-grid__list">
                {items.map((item, index) => (
                    <li className="kona-grid__item" key={`${index}_${item.id}`}>
                        <RuleItem {...item} onOpen={onOpen} />
                    </li>
                ))}
            </ul>
            <Spinner className="kona-grid__spinner" isActive={isLoading} withOverlay />
            {!isLoading && (
                <div className="kona-grid__load-more">
                    <RuleLoadMore />
                </div>
            )}
        </div>
    );
};
