import './general/scss/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { app } from 'general/js/app';
import { NotificationShower } from 'components/notifications/notification-shower';
import { HomePage } from 'components/home-page/home-page';
import 'general/js/what-input';
import 'components/lazysizes';
import 'components/spinner';

app.init();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <NotificationShower />
        <main className="main">
            <HomePage />
        </main>
    </React.StrictMode>
);
