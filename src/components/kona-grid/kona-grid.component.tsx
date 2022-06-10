import React from 'react';
import { render } from 'react-dom';
import { DcBaseComponent } from '@deleteagency/dc';
import { KonaFilter } from 'components/kona-grid/kona-filter';

export class KonaGridComponent extends DcBaseComponent {
    static namespace = 'kona-grid';
    static requiredRefs = [];

    init() {
        render(<KonaFilter />, this.element);
    }
}
