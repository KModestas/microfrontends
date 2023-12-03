module.exports = {
  module: {
    rules: [
      {
        // use babel to transpile the syntax in all .mjs and .js 
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // transpile JSX into vanilla JS
              '@babel/preset-react',
              // transpile all JS code into ES5
              '@babel/preset-env'
            ],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
