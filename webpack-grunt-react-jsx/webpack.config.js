const path = require('path');

module.exports = function(env) {
    // console.log('env=', env);
    // console.log('process.env=', process.env);
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV); // 'local'
    // console.log('Production: ', env.production); // true
    if (typeof process.env.NODE_ENV === 'undefined') {
        return getDefaultConfig();
    };
}

function getDefaultConfig() {
    return {
        plugins: [],
        entry: './src/app.js',
        output: {
            filename: 'app.js',
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