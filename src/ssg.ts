import { ReactNode } from 'react';
import { HomePage } from 'general/static/pages/home';
import { VideoPage } from 'general/static/pages/video';

interface Page {
    name: string;
    component: ReactNode;
}

export const pages: Page[] = [
    {
        name: 'index',
        component: HomePage,
    },
    {
        name: 'video',
        component: VideoPage,
    },
];
