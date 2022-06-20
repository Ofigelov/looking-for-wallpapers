import React from 'react';
import { render } from 'react-dom';
import { DcBaseComponent } from '@deleteagency/dc';
import { NotificationShower } from 'components/notifications/notification-shower';

export class NotificationShowerComponent extends DcBaseComponent {
    static namespace = 'notifications';

    init = () => {
        render(<NotificationShower />, this.element);
    };
}
