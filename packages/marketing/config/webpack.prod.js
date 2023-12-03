const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // make remoteEntry.js point to the correct path on our s3 bucket where our files are served. Each microfrontend's files will be located on a different path on the s3 bucket
    publicPath: '/marketing/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      // we expose the boostrap file rather than index.js because that is what is exporting our mount function
      //  The alias allows us to give a more meaningful name for when the container imports the remote otherwise all remote imports will look the same E.g. namepace/src/index
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
