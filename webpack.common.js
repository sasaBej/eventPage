const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  entry: {
    main: path.resolve(__dirname, 'src', 'index.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'EvoEvents',
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      configFile: env.CONFIG
      // favicon: path.resolve(__dirname, "public", "favicon.ico"),
    }),
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new ESLintPlugin({
      extensions: ['ts', 'tsx']
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        },
        mode: 'write-references'
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `public/${env.CONFIG}.js`,
          to: '.'
        }
      ]
    })
  ],
  stats: 'minimal',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
    ]
  }
});
