import React, { ReactNode } from 'react';
import union from 'lodash/union';
import { IEntrypoint, IWebpackManifest, SvgFile } from 'general/types/pageTypes';

const getFiles = (name: keyof IEntrypoint, entrypoints: IEntrypoint[]) =>
    union(...entrypoints.map((entry) => entry[name]));

const Scripts = ({ filePaths }: { filePaths: string[] }) => (
    <>
        {filePaths.map((filePath, index) => (
            <script defer src={filePath} key={'script_' + index} />
        ))}
    </>
);

const Styles = ({ filePaths }: { filePaths: string[] }) => (
    <>
        {filePaths.map((filePath, index) => (
            <React.Fragment key={'style_' + index}>
                <link rel="preload" href={filePath} as="style" />
                <link rel="stylesheet" href={filePath} />
            </React.Fragment>
        ))}
    </>
);

const Svgs = ({ filePaths, files }: { filePaths: string[]; files: SvgFile[] }) => (
    <div
        dangerouslySetInnerHTML={{
            __html: files
                .filter(({ path, content }) => filePaths.some((_path) => _path === path) && content)
                .map(({ content }) => content)
                .join(''),
        }}
    />
);

export const DefaultLayout = ({
    children,
    title,
    chunks,
    manifest,
    svgFiles,
    version,
}: IDefaultLayout): JSX.Element => {
    const entrypoints: IEntrypoint[] = [];
    chunks?.forEach((chunk) => entrypoints.push(manifest.entrypoints[chunk]));
    const css = getFiles('css', entrypoints);
    const js = getFiles('js', entrypoints);
    const mjs = getFiles('mjs', entrypoints);
    const svg = getFiles('svg', entrypoints);
    return (
        <html className="html" lang="en">
            <head>
                <title>{`${version > 0 ? 'v_' + version + ' ' : ''}${title}`}</title>
                <meta name="viewport" content="width=device-width" />
                <meta charSet="utf-8" />
                <link
                    rel="preload"
                    href="https://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1MmgVxIIzI.woff2"
                    as="font"
                    type="font/woff2"
                />
                <link rel="icon" type="image/png" sizes="32x32" href="/dist/favicons/32.png" />
                <link rel="shortcut icon" href="/dist/favicons/32.png" />
                <link rel="manifest" href="/dist/favicons/site-webmanifest.json" />
                {css.length && <Styles filePaths={css} />}
            </head>
            <body className="body">
                {svgFiles?.length && !svg.length && <Svgs filePaths={svg} files={svgFiles} />}
                {children}
                {!!mjs.length && <Scripts filePaths={mjs} />}
                {!mjs.length && js.length && <Scripts filePaths={js} />}
            </body>
        </html>
    );
};
export interface IDefaultLayout {
    chunks?: string[];
    svgFiles?: SvgFile[];
    title: string;
    children: ReactNode;
    manifest: IWebpackManifest;
    version: number;
}
