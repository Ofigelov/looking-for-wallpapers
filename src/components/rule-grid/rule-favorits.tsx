import React from 'react';
import { KonaSpecialTags } from 'components/kona-grid/kona-special-tags';

const ratings = ['webm', 'lazyprocrastinator'];

export const RuleFavorite = (): JSX.Element => <KonaSpecialTags tags={ratings} title="Favourite" />;
