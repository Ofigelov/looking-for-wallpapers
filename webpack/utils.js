const _ = require('lodash');
const path = require('path');
const ReactDOMServer = require('react-dom/server.js');
const { readFile, writeFile } = require('fs/promises');
const beautify = require('beautify');

const _seed = {};
const configureManifest = (_entrypoints) => ({
    seed: _seed,
    filter: ({ name }) => !name.endsWith('.map') || !name.endsWith('.txt'),

    generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, { name, path }) => {
            manifest[name] = path;
            return manifest;
        }, seed);

        const entrypointFiles = {};

        for (const [key, value] of Object.entries(entrypoints)) {
            let _value = value;

            if (key !== 'app') {
                _value = value.filter((fileName) => !fileName.includes('runtime'));
            }

            const js = _value
                .filter((fileName) => fileName.endsWith('.js'))
                .map((file) => `/dist/${file}`);
            const mjs = _value
                .filter((fileName) => fileName.endsWith('.mjs'))
                .map((file) => `/dist/${file}`);
            const css = _value
                .filter((fileName) => fileName.endsWith('.css'))
                .map((file) => `/dist/${file}`);

            _.set(entrypointFiles, `${key}.js`, js);
            _.set(entrypointFiles, `${key}.mjs`, mjs);
            _.set(entrypointFiles, `${key}.css`, css);

            // eslint-disable-next-line no-restricted-syntax
            for (const [fileName, filePath] of Object.entries(manifestFiles)) {
                const fileRegexp = /(?<name>[\w][\w-]*).(?<hash>[a-zA-Z0-9]*).(?<ext>[\w]{2,4}$)/;

                if (fileName.match(fileRegexp)) {
                    const groups = fileName.match(fileRegexp).groups;

                    if (groups && groups.name === key && fileName.endsWith('.svg')) {
                        _.set(entrypointFiles, `${key}.svg`, [filePath.replace('./', '')]);
                    }
                }
            }
        }

        return {
            files: manifestFiles,
            entrypoints: _.merge(_entrypoints, entrypointFiles),
        };
    },
});

let awaitMain = true;
let awaitSsg = true;
let version = 0;
let ssgFilename = '';

class ReactPageBuilderPlugin {
    constructor({ name }) {
        this.name = name;
    }

    apply(compiler) {
        compiler.hooks.watchRun.tap('ReactPageBuilderPlugin', () => {
            if (this.name === 'main') awaitMain = true;
            if (this.name === 'ssg') awaitSsg = true;
            console.log(
                '\nReactPageBuilderPlugin --watchRun-- hook',
                this.name,
                awaitMain,
                awaitSsg
            );
        });
        compiler.hooks.done.tap('ReactPageBuilderPlugin', (context) => {
            if (this.name === 'main') awaitMain = false;
            if (this.name === 'ssg') {
                awaitSsg = false;
                let assetsInfo = context.compilation.assetsInfo;
                if (assetsInfo.size) {
                    ssgFilename = [...assetsInfo.keys()][0].replace('.map', '');
                }
            }
            console.log('\nReactPageBuilderPlugin --done-- hook', this.name, awaitMain, awaitSsg);

            if (!awaitMain && !awaitSsg) {
                Promise.all([
                    readFile(path.resolve(__dirname, '../dist/manifest.json'), {
                        encoding: 'utf8',
                    }),
                    import(`../dist/${ssgFilename}`),
                ]).then(([manifestString, ssg]) => {
                    const manifest = JSON.parse(manifestString);
                    const pages = ssg.default.pages;
                    Promise.all(
                        pages.map((page) => {
                            const htmlString =
                                '<!DOCTYPE html>' +
                                ReactDOMServer.renderToStaticMarkup(
                                    page.component({ manifest, version })
                                );
                            console.log(htmlString);
                            return writeFile(
                                path.resolve(__dirname, `../dist/${page.name}.html`),
                                beautify(htmlString, { format: 'html' })
                            );
                        })
                    ).then((res) => {
                        console.log('html files rendered');
                        version++;
                    });
                });
            }
        });
    }
}

module.exports = {
    configureManifest,
    ReactPageBuilderPlugin,
};
