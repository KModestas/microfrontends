const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: { 
    publicPath: 'http://localhost:8081/',
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // exposes a global variable in the browser of the same name, all code is avaliable through this variable
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
    // automatically adds our webpack files as script tags
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

// merges this config with webpack.common.js which is shared by both dev and prod
module.exports = merge(commonConfig, devConfig);
