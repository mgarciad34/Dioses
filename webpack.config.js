const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        registro: './src/public/js/pages/registro.js',
        login: './src/public/js/pages/login.js',
        recuperar: './src/public/js/pages/recuperarusuario.js',
        hades: './src/public/js/pages/dioses/comprobarHades.js',
        registrarHumano: './src/public/js/pages/dioses/registrarhumano.js',
        crearPruebaLibre: './src/public/js/pages/dioses/pruebaslibres.js',
        crearPruebaEleccion: './src/public/js/pages/dioses/pruebaseleccion.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'src','public', 'dist'),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src','public'), // Ruta base para el servidor de desarrollo
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
