const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        registro: './frontend/src/js/pages/registro.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src/public'), // Ruta base para el servidor de desarrollo
        },
        port: 8090,
        open: {
            target: 'http://localhost:8090/src/public/index.html',
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
};
