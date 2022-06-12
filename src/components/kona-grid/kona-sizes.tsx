import React from 'react';
import { KonaSpecialTags } from 'components/kona-grid/kona-special-tags';

const sizes = ['width:2560..', 'width:2560', 'height:1440..', 'height:1280..'];

export const KonaSizes = (): JSX.Element => <KonaSpecialTags tags={sizes} title="Sizes" />;
