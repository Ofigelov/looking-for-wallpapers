import React from 'react';
import { DefaultLayout } from 'general/static/layouts/default-layout';
import { IWebpackManifest, SvgFile } from 'general/types/pageTypes';

export const VideoPage = ({ manifest, svgFiles, version }: IPage): JSX.Element => {
    return (
        <DefaultLayout
            chunks={['app', 'init']}
            title="Homepage"
            manifest={manifest}
            svgFiles={svgFiles}
            version={version}
        >
            <main className="main">
                <section className="section">
                    <div className="container" data-dc-rule-grid />
                </section>
            </main>
        </DefaultLayout>
    );
};

interface IPage {
    manifest: IWebpackManifest;
    svgFiles: SvgFile[];
    version: number;
}
