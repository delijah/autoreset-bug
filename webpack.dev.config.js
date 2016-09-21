const path = require('path');
const webpack = require('webpack');
const postcssAutoreset = require('postcss-autoreset');
const postcssInitial = require('postcss-initial');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 10 });

module.exports = {
    debug: true,
    entry: {
        app: [ 'react-hot-loader/patch', path.resolve('app/scripts/app.js'), path.resolve('app/styles/globals.sass') ],
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    resolve: {
        alias: {
            vendor: path.resolve('vendor'),
        },
    },
    module: {
        loaders: [{
            test: /\.sass$/,
            include: path.resolve('app/styles/globals.sass'),
            loader: 'happypack/loader?id=sass',
        }, {
            test: /\.sass$/,
            include: path.resolve('app/styles'),
            exclude: path.resolve('app/styles/globals.sass'),
            loader: 'happypack/loader?id=sassModules',
        }, {
            test: /\.js$/,
            include: path.resolve('app/scripts'),
            loader: 'happypack/loader?id=js',
        }],
    },
    postcss: () => [
        postcssAutoreset({
            reset: {
                all: 'initial',
                boxSizing: 'border-box',
            },
        }),
        postcssInitial({
            replace: true,
        }),
        autoprefixer({ browsers: [ 'last 2 versions' ] })
    ],
    plugins: [
        new HappyPack({
            id: 'sass',
            loaders: [ 'style', 'css?sourceMap', 'postcss?sourceMap=inline', 'sass?sourceMap' ],
            threadPool: happyThreadPool,
        }),
        new HappyPack({
            id: 'sassModules',
            loaders: [
                'style',
                'css?modules&importLoaders=2&camelCase&sourceMap',
                'postcss?sourceMap=inline',
                'sass?sourceMap',
            ],
            threadPool: happyThreadPool,
        }),
        new HappyPack({
            id: 'js',
            loaders: [ 'babel' ],
            threadPool: happyThreadPool,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve('app/index.html'),
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: path.resolve('dist'),
        hot: true,
    },
};
