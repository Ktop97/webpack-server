//Configuracion necesaria de webpack para ejecutar nuextra app

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

//Exportar modulos
module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                //Css por componente
                test: /\.css$/,
                exclude: /style.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                //Css General main
                test: /style.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                //Html general
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                },
            },
            //Renderizar imagenes 
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    //Cargando plugins necesarios .
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
            //styleMedia: './comop'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),

        new MinifyPlugin(),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ],
        }),
    ],
};