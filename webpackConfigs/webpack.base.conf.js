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
    app: `${PATHS.src}/index.js`,
    cards: `${PATHS.src}/pages/cards/cards.js`,
    home: `${PATHS.src}/pages/home/home.js`,
    index: `${PATHS.src}/pages/index/index.js`,
    registration: `${PATHS.src}/pages/registration/registration.js`,
    search: `${PATHS.src}/pages/search/search.js`,
    'colors-and-fonts': `${PATHS.src}/pages/colors-and-fonts/colors-and-fonts.js`,
    'forms-elements': `${PATHS.src}/pages/forms-elements/forms-elements.js`,
    'headers-and-footers': `${PATHS.src}/pages/headers-and-footers/headers-and-footers.js`,
    'room-details': `${PATHS.src}/pages/room-details/room-details.js`,
    'sign-in': `${PATHS.src}/pages/sign-in/sign-in.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
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
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pages/index/index.pug`,
      filename: `./index.html`,
      title: 'Custom template',
      inject: false
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/**/**/images/*`, to: `${PATHS.assets}images/[name].[ext]`},
      {from: `${PATHS.src}/**/**/favicons/*`, to: `${PATHS.assets}favicons/[name].[ext]`}
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PATHS.src}/${PATHS.pages}${page}/${page}.pug`,
      filename: `./${PATHS.pages}${page}/${page}.html`,
      inject: false
    }))
  ],
}
