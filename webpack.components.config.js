import path from 'path';
const __dirname = path.resolve();

export default {
  mode: 'development',
  entry: './src/js/components/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'components.js',
  },
  resolve: {
    extensions: ['.js', '.mjs'],
  },
  // devtool: 'eval-cheap-module-source-map'
  // devtool: 'eval'
  devtool: 'source-map'
};