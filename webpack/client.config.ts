import path from 'path';
import webpack, { Configuration, Entry, WebpackPluginInstance } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import { IS_DEV, DIST_DIR, SRC_DIR } from './env';

import assetsLoader from './loaders/assets';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';

const config: Configuration = {
  target: 'web',
  entry: [
    IS_DEV && 'react-hot-loader/patch',
    // Entry для работы HMR
    IS_DEV && 'webpack-hot-middleware/client',
    IS_DEV && 'css-hot-loader/hotModuleReplacement',
    path.join(SRC_DIR, 'client')
  ].filter(Boolean) as unknown as Entry,
  module: {
    rules: [assetsLoader.client, cssLoader.client, jsLoader.client]
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    fallback: { url: false }
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    // Plugin для HMR
    IS_DEV && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean) as WebpackPluginInstance[],
  devtool: 'source-map',
  performance: {
    hints: IS_DEV ? 'warning' : false
  },
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })]
  }
};

export default config;
