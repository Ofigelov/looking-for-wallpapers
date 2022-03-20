const webpack = require('webpack');
const path = require('path');
const entry = require('./webpack.entry.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const babelConfig = require('../babel.config.js');
const _ = require('lodash');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const { configureManifest, ReactPageBuilderPlugin } = require('./utils');

let _entrypoints = {};

module.exports = (isModern, isDev, isWatch = false) => ({
    devtool: 'source-map',
    entry,
    output: {
        path:  path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            'node_modules',
            path.resolve(__dirname, '../src'),
        ],
        alias: {
            'style-settings': path.resolve(__dirname, './src/general/scss/settings/index.scss'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: [/node_modules(?!(\/|\\)@deleteagency)/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: _.merge(babelConfig, {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            esmodules: isModern,
                                        },
                                        bugfixes: isModern,
                                    },
                                ],
                            ],
                        }),
                    },
                ],
            },
            {
                test: /\.(tsx?)$/,
                exclude: [/node_modules(?!(\/|\\)@deleteagency)/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: _.merge(babelConfig, {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            esmodules: isModern,
                                        },
                                        bugfixes: isModern,
                                    },
                                ],
                            ],
                        }),
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require('os').cpus().length - 1,
                            poolTimeout: isWatch ? Infinity : 500, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true, // for thread-loader
                        },
                    },
                ],
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                exclude: /svg[\/\\]/,
                loader: 'file-loader',
                options: {
                    name: 'images/[path][name].[ext]',
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
            {
                test: /\.svg$/,
                include: /svg[\/\\]/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId: 'icon-[name]',
                            extract: true,
                            spriteFilename: '[chunkname].[hash:6].svg',
                        },
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { name: 'removeNonInheritableGroupAttrs' },
                                { name: 'collapseGroups' },
                            ],
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        chunkIds: 'deterministic',
        splitChunks: {
            chunks: 'all',
            name: false,
            automaticNameDelimiter: '.',
            cacheGroups: {
                corejs: {
                    test: /[\\/]node_modules[\\/](core-js)[\\/]/,
                    minChunks: 2,
                    enforce: true,
                    reuseExistingChunk: true,
                    priority: 20,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true,
                    reuseExistingChunk: true,
                    priority: 30,
                },
                project: {
                    test(mod) {
                        if (!mod.context?.includes('project')) {
                            return false;
                        }
                        if (['svg'].some((str) => mod.context?.includes(str))) {
                            return false;
                        }
                        return true;
                    },
                    minChunks: 2,
                    enforce: true,
                    reuseExistingChunk: true,
                    priority: 10,
                },
            },
        },
        runtimeChunk: 'single',
        removeEmptyChunks: true,
    },
    plugins: [
        isWatch ? new CleanObsoleteChunks() : false,
        new ReactPageBuilderPlugin({ name: 'main' }),
        new WebpackManifestPlugin(configureManifest(_entrypoints)),
        new ForkTsCheckerWebpackPlugin(),
        new SpriteLoaderPlugin({
            plainSprite: true,
            spriteAttrs: {
                width: '0',
                height: '0',
                focusable: 'false',
                'aria-hidden': 'true',
                class: 'visually-hidden',
            },
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, '../src/general/favicons'),
                            destination: path.resolve(__dirname, '../dist/favicons'),
                        },
                    ],
                },
            },
        }),
        new DuplicatePackageCheckerPlugin(),
        new webpack.DefinePlugin({
            'env.MODE': JSON.stringify(isDev ? 'development' : 'production'),
        }),
    ].filter(Boolean),
    stats: {
        children: false,
    },
});
