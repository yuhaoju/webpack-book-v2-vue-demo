// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const isProduction = process.env.NODE_ENV == 'production';

module.exports = () => {
  return {
    entry: './src/index.js',
    devServer: {
      open: true,
      port: 3000,
    },
    output: {
      chunkFilename: isProduction ? '[name].[chunkhash:8].chunk.js' : '[name].chunk.js',
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
    },
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          }
        }
      },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        }, {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            'css-loader'
          ]
        },
      ]
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      },
      extensions: ['.js', '.vue'],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({ template: 'index.html' }),
      isProduction ? new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      }) : null
    ].filter(Boolean)
  };
};
