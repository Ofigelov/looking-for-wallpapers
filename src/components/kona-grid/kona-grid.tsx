import React, { useContext } from 'react';
import { KonaImage } from 'components/kona-image/kona-image';
import { FilterContext } from 'components/filter/filter-service';

export const KonaGrid = (): JSX.Element => {
    const { items } = useContext(FilterContext);
    return (
        <ul className="kona-grid">
            {items.map((item) => (
                <li className="kona-grid__item" key={item.id}>
                    <KonaImage {...item} />
                </li>
            ))}
        </ul>
    );
};
