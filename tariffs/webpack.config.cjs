const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./ui-src/index.html"
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    entry: './ui-src/ui.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'ui-dist')
    },
    devServer: {
        open: true,
        port: 8081
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                loader: require.resolve('babel-loader'),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    }
};
