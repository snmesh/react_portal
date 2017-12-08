const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: [
        path.resolve(__dirname, "src/js/app.js"),
        path.resolve(__dirname, "src/scss/style.scss")
    ],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "js/bundle.js"
    },
    module: {

        loaders: [
            {
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader?importLoaders=1',
                }),
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /(node_modules)/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.json$/, 
                exclude: /(node_modules)/,
                loader: 'json-loader'
            }
        ]
    },
    watch: true,
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/style.css',
            allChunks: true,
        }),
        
    ],
    resolve: {
        alias: {
            ComponentsExpl: path.resolve(__dirname, 'src/js/components/exploitation'),
            ComponentsTransp: path.resolve(__dirname, 'src/js/components/transport'),
            ComponentsAdmin: path.resolve(__dirname, 'src/js/components/admin'),
            Actions: path.resolve(__dirname, 'src/js/actions'),
            Config: path.resolve(__dirname, 'etc'),
        },
    }
};


