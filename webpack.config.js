const PATH = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    source: PATH.join(__dirname, 'src'),
    build: PATH.join(__dirname, 'build')
};

const conf = {

    context: PATHS.source,

    entry: {
        index: './game.js',
        style: './style.css'
    },

    output: {
        filename: '[name].js',
        path: PATHS.build,
        publicPath: "/build/" //required for webpack-dev-server
    },

    plugins: [
        new CaseSensitivePathsPlugin(),
        new ExtractTextPlugin("[name].css")
    ],

    devServer: {
        overlay: true,
        contentBase: PATH.join(__dirname),
        watchContentBase: true,
        watchOptions: {
            poll: true
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            plugins: ['react-hot-loader/babel'],
                        },
                    }
                ]
            }
        ]
    }
};

module.exports = (env, argv) => {
    conf.devtool = argv.mode === 'development' ? 'source-map' : false; // source-map was choosen because css-loader source-map don't work with eval
    return conf;
};

