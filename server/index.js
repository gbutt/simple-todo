import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import bodyParser from 'body-parser';
import TodoRoutes from './todo-routes';

const APP_PORT = 3001;

const compiler = webpack({
  mode: 'development',
  entry: ['whatwg-fetch', path.resolve(__dirname, '../frontend', 'app.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, '../frontend'), path.join(__dirname, '../node_modules/@salesforce/design-system-react')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|gif|jpe?g|png)$/,
        use: {
          loader: 'url-loader?limit=10000',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: 'url-loader?limit=30&name=assets/fonts/webfonts/[name].[ext]',
        },
      },
    ],
  },
  output: {
    filename: 'app.js',
    path: '/',
  },
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/frontend/',
  stats: { colors: true },
});

app.use(bodyParser.json());
app.use('/slds', express.static(path.resolve(__dirname, '../node_modules/@salesforce-ux/design-system/')));
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use(TodoRoutes);

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
