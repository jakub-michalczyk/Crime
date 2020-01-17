const path = require('path');

module.exports = {
    entry: ['element-remove', './src/js/index.js', './src/js/script.js'],
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
              },
        ]
    }
}
