import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://github.com/IndexXuan/vite-plugin-mpa
// плагин для создания мультистраничного приложения
// import mpa from 'vite-plugin-mpa';

const alias = [
    {
        find: 'general',
        replacement: 'src/general',
    },
    {
        find: 'components',
        replacement: 'src/components',
    },
    {
        find: '~style-settings',
        replacement: 'src/general/scss/settings/index.scss',
    },
];

export const vendor = ['react', 'react-dom'];

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react() /*mpa()*/],
    build: {
        manifest: true,
        sourcemap: true,
    },
    resolve: {
        alias: alias.map(({ find, replacement }) => ({
            find,
            replacement: path.resolve(__dirname, replacement),
        })),
        dedupe: vendor,
    },
    server: {
        fs: {
            allow: ['..'],
        },
    },
});
