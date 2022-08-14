import React from 'react';
import { render } from 'react-dom';
import { DcBaseComponent } from '@deleteagency/dc';
import { RuleFilter } from './rule-filter';

export class RuleGridComponent extends DcBaseComponent {
    static namespace = 'rule-grid';

    static requiredRefs = [];

    init() {
        render(<RuleFilter />, this.element);
    }
}
