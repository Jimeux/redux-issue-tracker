const path = require('path')
const webpack = require('webpack')

const node_modules_dir = path.join(__dirname, 'node_modules')
const deps = [
  //'react/dist/react.min.js',
  //'react-dom/dist/react-dom.min.js',
  //'react-addons-css-transition-group/index.js',
  //'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js',
  'babel-polyfill/dist/polyfill.min.js'
]

const noParse = []
const alias = {}

deps.forEach((dep) => {
  const depPath = path.resolve(node_modules_dir, dep)
  alias[dep.split(path.sep)[0]] = depPath
  noParse.push(depPath)
})

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    //'webpack-hot-middleware/client',
    './src/entry'
  ],

  resolve: {
    alias,
    modulesDirectories: ['src', 'node_modules', 'shared']
  },

  output: {
    path: '/',
    publicPath: 'http://localhost:3000/public/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    noParse,
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, 'src', 'styles')
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
}