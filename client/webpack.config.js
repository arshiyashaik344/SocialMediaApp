const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              {
                plugins: ['@babel/plugin-syntax-jsx']
              }
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              removeCR: true
            }
          }
        ],
        include: [path.join(__dirname, 'src'), /node_modules/]
      },
      // {
      //   test: /\.s[a|c]ss$/,
      //   use: [
      //     {
      //       loader: 'sass-loader'
      //     },
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader'
      //     }
      //   ],
      //   include: [path.join(__dirname, 'src'), /node_modules/]
      // },
      {
        test: /\.(png|jpg|woff|svg|eot|ttf|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'assets/img/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    })
  ]
};
