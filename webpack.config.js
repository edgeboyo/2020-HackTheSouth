const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry : {
       'dist/script.js': './src/js/components/App.jsx',
       'dist/main.css~': './src/scss/main.scss'
   },
   output : {
       path: __dirname+'/',
       filename: '[name]'
   },
   devServer: {
      inline: true,
      contentBase: './',
      port: 3006
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015', 'stage-2', 'react']
                  }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['css-loader', 'sass-loader']
                /*
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    
                })*/

            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              use: "url-loader?limit=1000000&name=images/[name].[ext]"
            }
            // {
            //   test: /\.(png|jpg|gif)$/,
            //   exclude: /node_modules/,
            //   use: [
            //     {
            //       loader: 'file-loader',
            //       options: {}
            //     }
            //   ]
            // }
        ]
    }///,
    /*
    plugins: [
       new ExtractTextPlugin('./dist/main.css')

   ]*/
};
