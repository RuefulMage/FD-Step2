const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
    pages: 'pages/'
}

const PAGES = fs.readdirSync(`${PATHS.src}/${PATHS.pages}`);

module.exports = {
    // BASE config
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
            {
                test: /\.(woff(2)?|ttf|eot|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name]/[name].[ext]',
                    outputPath: `${PATHS.assets}fonts`
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: `./postcss.config.js`}}
                    }, {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: `./postcss.config.js`}}
                    }
                ]
            }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/pages/index/index.pug`,
            filename: `./index.html`
        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}/${PATHS.assets}images`, to: `${PATHS.assets}images`}
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PATHS.src}/${PATHS.pages}${page}/${page}.pug`,
            filename: `./${PATHS.pages}${page}/${page}.html`
        }))
    ],
}