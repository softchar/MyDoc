# webpack-dev-server简单使用

[TOC]

## 安装webpack-dev-server

初始化package.json并安装必要的插件，如下。

```javascript
npm init -y
npm install webpack webpack-cli --save-dev
npm install webpack-dev-server --save-dev
npm install html-webpack-plugin --save-dev
npm install clean-webpack-plugin --save-dev
```



## 配置package.json

```javascript
"scripts": {
    "watch": "webpack --watch",
    "start": "webpack-dev-server --open",
    "build": "webpack"
},
```



## 配置webpack.config.js

```javascript
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    entry: {
        app: './src/index.js',
    },
    
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            title: 'Development'
        })
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }

};
```

## 运行

```javascript
npm start
```



