const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const webpack = require('webpack');
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
  pages: 'pages/'
}

const PAGES = fs.readdirSync(`${PATHS.src}/${PATHS.pages}`);

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name]/[name].[ext]',
          outputPath: `${PATHS.assets}fonts`,
          publicPath: '../fonts'
        }
      },
      {
        test: /\.(jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: '[name].[ext]',
          outputPath: `../../assets/images`,
        }
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          esModule: false,
          name: "[name].[ext]",
          outputPath: (url, resourcePath, context) => {
            const relativePath = path.relative(context, resourcePath);
            let pathParts = relativePath.split("/");
            let lastFolder = pathParts[pathParts.length - 2];
            if (/\/fonts\//.test(relativePath)) {
              return `assets/fonts/${lastFolder}/${url}`;
            }
            return `../../assets/images/${url}`;
          },
        },
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/pages/index/index.pug`,
      filename: `./index.html`
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/**/**/images/*`, to: `${PATHS.assets}images/[name].[ext]`}
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
