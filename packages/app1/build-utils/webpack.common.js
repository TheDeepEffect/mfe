const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { ModuleFederationPlugin } = require('webpack').container;
const deps=require('./../package.json').dependencies;
module.exports={
    entry:path.resolve(__dirname,'..','./src/index.js'),
    devtool: 'eval-source-map',
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js','.jsx']
      },
    output:{
        path:path.resolve(__dirname,'..','../core-ui/dist/app1'),
        filename:'bundle.js',
    },
    plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname,'..', './src/index.html'),
              }),
              new ModuleFederationPlugin({
                name:'app1',
                library:{type:'var',name:'app1'},
                filename:'remoteEntry.js',
                exposes:{
                    "./App":"./src/App",
                },
                shared:{
                    ...deps,
                    "react":{
                        eager: true,
                        import: 'react',
                        shareKey: 'react',
                        shareScope: 'default',
                        singleton: true,
                    },
                    "react-dom":{
                        eager: true,
                        import: 'react-dom',
                        shareKey: 'react-dom',
                        shareScope: 'default',
                        singleton: true,
                    }
                },
            }),
        new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(),
    ],
    devServer:{
        port:3001,
        contentBase:path.resolve(__dirname,'..','../core-ui/dist/app1'),
        hot:true,
    }
}