const webpack = require('webpack');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const babelConfig = require('../babel.config.js');
const _ = require('lodash');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const { ReactPageBuilderPlugin } = require('./utils');

module.exports = (isModern, isDev, isWatch = false, isDeploy = false) => ({
    devtool: 'source-map',
    entry: {
        ssg: 'ssg.ts',
    },
    target: 'node16.13',
    node: {
        __dirname: false,
    },
    output: {
        globalObject: 'global',
        path: path.resolve(__dirname, '../dist'),
        filename: 'ssg.[chunkhash].js',
        library: { type: 'umd' },
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['node_modules', path.resolve(__dirname, '../src')],
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
                            sourceType: 'unambiguous',
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
                            sourceType: 'unambiguous',
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
        ],
    },
    optimization: {
        chunkIds: 'deterministic',
        splitChunks: false,
        removeEmptyChunks: true,
    },
    plugins: [
        new ReactPageBuilderPlugin({ name: 'ssg' }),
        isWatch ? new CleanObsoleteChunks() : false,
        new ForkTsCheckerWebpackPlugin(),
        new DuplicatePackageCheckerPlugin(),
        new webpack.DefinePlugin({
            'env.MODE': JSON.stringify(isDev ? 'development' : 'production'),
        }),
    ].filter(Boolean),
    stats: {
        children: false,
    },
});
