const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js',
        home: './src/js/pages/home.js',
        about: './src/js/pages/about.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            chunks: ['main'],
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './public/home.html',
            chunks: ['home'],
            filename: 'home.html',
        }),
        new HtmlWebpackPlugin({
            template: './public/about.html',
            chunks: ['about'],
            filename: 'about.html',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        open: true,
    },
};
