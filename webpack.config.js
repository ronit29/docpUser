const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const clientConfig = {
    entry: {
        'index': ['babel-polyfill', './dev/js/index.js']
    },
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "style.css",
        })
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: [],
                    presets: ['es2015', 'react', "stage-0"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }

}

const serverConfig = {
    entry: './index.js',
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: __dirname,
        filename: 'server.js',
        publicPath: '/'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', "stage-0",
                        ['env', {
                            targets: {
                                node: 8,
                            },
                        }],
                    ],
                },
            },
        ],
    },
    externals: nodeExternals(),
}



module.exports = [serverConfig, clientConfig]