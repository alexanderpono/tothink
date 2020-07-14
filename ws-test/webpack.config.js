const path = require('path');

module.exports = function(env) {
    if (typeof process.env.NODE_ENV === 'undefined') {
        return getDefaultConfig();
    };
}

function getDefaultConfig() {
    return {
        plugins: [],
        entry: './src/client.js',
        output: {
            filename: 'client.js',
            path: path.resolve(__dirname, 'www')
        }
        ,
        devServer: { 
            contentBase: "./www", 
            open: true,
            watchContentBase: true,
            port: 8081
        },
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: "babel-loader"
                }
              },
            ]
        }    
    }

}