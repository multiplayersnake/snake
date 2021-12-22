const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.tsx', './src/styles/index.css'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|ico|jpe?g|png|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[contenthash][ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff?2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[contenthash][ext]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/index.html'
    })
  ]
};