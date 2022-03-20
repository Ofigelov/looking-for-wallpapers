import { DcBaseComponent } from '@deleteagency/dc';
import { render } from 'react-dom';
import { createElement } from 'react';
import { KonaFilter } from 'components/kona-grid/kona-filter';

export class KonaGridComponent extends DcBaseComponent {
    static namespace = 'kona-grid';
    static requiredRefs = [];

    init() {
        render(createElement(KonaFilter, null), this.element);
    }
}
