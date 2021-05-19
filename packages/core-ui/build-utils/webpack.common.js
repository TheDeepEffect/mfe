const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps=require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
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
        path:path.resolve(__dirname,'..','./dist'),
        filename:'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'..', './src/index.html'),
          }),
        new ModuleFederationPlugin({
            name:'core-ui',
            remotes:{
                app1:`app1@${getRemoteEntry('app1')}`
            },
            shared:{
                ...deps,
                "react":{
                    eager: true,
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
        port:3000,
        contentBase:path.resolve(__dirname,'..','./dist'),
        hot:true,
    }
};

function getRemoteEntry(appName){
    const {  HOSTNAME = '' } = process.env;
    if(!HOSTNAME){
        return `//localhost:3000/${appName}/remoteEntry.js`;
    }else{
        return `//${HOSTNAME}/300/${appName}/remoteEntry.js`;
    }
}