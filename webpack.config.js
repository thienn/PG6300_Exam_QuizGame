const path = require('path');

// https://webpack.js.org/concepts/#output

// module.exports is a node feature to expose object to another file. So webpack will grab this file
// run it and access to whatever is defined here
// https://webpack.js.org/
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // loader let you customize the behavior of webpack
    // in this case, what to do with a JSX file
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.jsx$/,
            exclude: /node_modules/
        }, 
        {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ] 
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // https://webpack.js.org/configuration/devtool/ on how to use devtool
    /*
        for this case: cheap-module-eval-source-map - original source (lines only)
    */
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};

// __dirname will give the absolute path to your project, then it can specify the folder. Ex: public folder


