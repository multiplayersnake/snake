const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: ['./src/index.tsx', './src/styles/index.css'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle[contenthash].js',
    publicPath: '/',
    clean: true
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
        test: /\.(FBX)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/models3d/[contenthash][ext]'
        }
      },
      {
        test: /\.(mp3)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sound/[contenthash][ext]'
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
  ],
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })]
  }
};
