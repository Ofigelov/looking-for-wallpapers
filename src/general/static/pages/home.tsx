import React from 'react';
import { DefaultLayout } from 'general/static/layouts/default-layout';
import { IWebpackManifest, SvgFile } from 'general/types/pageTypes';

export const HomePage = ({ manifest, svgFiles, version }: IHomePage): JSX.Element => {
    return (
        <DefaultLayout
            chunks={['app', 'init']}
            title="Homepage"
            manifest={manifest}
            svgFiles={svgFiles}
            version={version}
        >
            <h1>hello worldddd</h1>
        </DefaultLayout>
    );
};

interface IHomePage {
    manifest: IWebpackManifest;
    svgFiles: SvgFile[];
    version: number;
}
