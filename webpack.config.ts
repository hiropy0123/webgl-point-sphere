import { Configuration } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const MODE = 'development';
const enabledSourceMap = MODE === 'development';

const config: Configuration = {
  mode: MODE,
  entry: './src/index.ts',
  output: {
    filename: `bundle.js`,
    path: `${__dirname}/dist`,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader', 'style-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            },
          },
          'import-glob-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.js', '.json'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: `${__dirname}/static/images/**/*`,
          to: `${__dirname}/dist/images`,
          flatten: true,
        },
      ]
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
    }),
  ],
  performance: {
    hints: false,
    maxAssetSize: 30000,
    maxEntrypointSize: 1000,
  },

  // Configuration for dev server
  devServer: {
    contentBase: `${__dirname}/dist/`,
    watchContentBase: true,
    open: true,
    port: 3333,
  },
};

export default config;
