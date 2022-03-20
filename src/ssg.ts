import { ReactNode } from 'react';
import { HomePage } from 'general/static/pages/home';

interface Page {
    name: string;
    component: ReactNode
}

export const pages: Page[] = [
    {
        name: 'index',
        component: HomePage
    }
]

