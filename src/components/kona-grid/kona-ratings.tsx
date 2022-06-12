import React from 'react';
import { KonaSpecialTags } from 'components/kona-grid/kona-special-tags';

const ratings = ['safe', 'questionableless', 'questionable', 'questionableplus', 'explicit'].map(
    (tag) => `rating:${tag}`
);

export const KonaRatings = (): JSX.Element => <KonaSpecialTags tags={ratings} title="Ratings" />;
