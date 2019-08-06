const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDevelopment = process.argv.mode === 'development';

const config = {
  entry: {
    "main": "./src/scss/main.scss",
  },
  devServer: {
    openPage: 'index.html',
    port: 9001,
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}

if(isDevelopment){
 config.devtool = 'inline-source-map';
}

module.exports = config
