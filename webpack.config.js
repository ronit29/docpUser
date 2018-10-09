// set env vars
require('dotenv').config()

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const client_dev = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false,
            exclude: ['index.ejs']
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
        new webpack.DefinePlugin({
            "DOCPRIME_PRODUCTION": false,
            "DOCPRIME_STAGING": false,
            "ASSETS_BASE_URL": JSON.stringify("/assets")
        }),
        new HtmlWebpackPlugin({
            filename: 'index.ejs',
            template: '!!raw-loader!./views/index.template.ejs',
            excludeAssets: [/style.*.css/]
        }),
        new HtmlWebpackExcludeAssetsPlugin()
    ]
}

const client_prod = {
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.CDN_BASE_URL + 'dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false,
            exclude: ['index.ejs'],
            beforeEmit: true
        }),
        new MiniCssExtractPlugin({
            filename: "style.[hash].css",
        }),
        new webpack.DefinePlugin({
            "DOCPRIME_PRODUCTION": true,
            "DOCPRIME_STAGING": false,
            "ASSETS_BASE_URL": JSON.stringify(process.env.CDN_BASE_URL + "assets")
        }),
        new HtmlWebpackPlugin({
            filename: 'index.ejs',
            template: '!!raw-loader!./views/index.template.prod.ejs',
            excludeAssets: [/style.*.css/]
        }),
        new HtmlWebpackExcludeAssetsPlugin()
    ]
}

const client_staging = {
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.CDN_BASE_URL + 'dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false,
            exclude: ['index.ejs'],
            beforeEmit: true
        }),
        new MiniCssExtractPlugin({
            filename: "style.[hash].css",
        }),
        new webpack.DefinePlugin({
            "DOCPRIME_STAGING": true,
            "DOCPRIME_PRODUCTION": false,
            "ASSETS_BASE_URL": JSON.stringify(process.env.CDN_BASE_URL + "assets")
        }),
        new HtmlWebpackPlugin({
            filename: 'index.ejs',
            template: '!!raw-loader!./views/index.template.ejs',
            excludeAssets: [/style.*.css/]
        }),
        new HtmlWebpackExcludeAssetsPlugin()
    ]
}

const client_base = {
    entry: {
        'index': ['babel-polyfill', './dev/js/index.js']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
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
                    MiniCssExtractPlugin.loader,
                    'css-loader'
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
    plugins: [
        new webpack.DefinePlugin({
            "DOCPRIME_PRODUCTION": process.env.NODE_ENV == 'production',
            "DOCPRIME_STAGING": process.env.NODE_ENV == 'staging',
            "ASSETS_BASE_URL": (process.env.NODE_ENV == 'staging' || process.env.NODE_ENV == 'production') ? (JSON.stringify(process.env.CDN_BASE_URL + "assets")) : JSON.stringify("/assets")
        }),
    ],
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


module.exports = env => {
    let clientConfig = { ...client_base, ...client_dev }

    if ((env && env.staging) || process.env.NODE_ENV == 'staging') {
        console.log("STAGING ENV")
        clientConfig = { ...client_base, ...client_staging }
    }

    if ((env && env.production) || process.env.NODE_ENV == 'production') {
        console.log("PRODUCTION ENV")
        clientConfig = { ...client_base, ...client_prod }
    }

    return [serverConfig, clientConfig]
}