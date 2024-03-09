const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'docs', 'js'),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
